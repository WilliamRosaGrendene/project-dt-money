import * as Dialog from "@radix-ui/react-dialog"
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema> //tipagem

export function NewTransactionModal() {

    const createTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.createTransaction
    })

    const{ //const oq?
        control, //utilizado quando vem uma info que não é de uma campo nativo do html ex input
        register, //pega os valores digitados nos inputs
        handleSubmit, //salva os dados em uma função do formulario
        reset
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues:{ // seta o value incial do botão no forumlario
            type: 'income'
        }
    })

    //função para criar uma nova transação que vem do formulário onSubmit
    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        const {description, price, category, type} = data;

       await createTransaction({
            description,
            price,
            category,
            type,
       })

        reset();
    }    
    

    return(
        <Dialog.Portal>
        <Overlay/>

          <Content>
            <CloseButton>
                <X size={24}/>
            </CloseButton>

            <Dialog.Title> Nova Transação</Dialog.Title>

             <form onSubmit={handleSubmit(handleCreateNewTransaction)}> {/*envia os dados para a função handleCreateNewTransaction */}
                <input 
                    type="text" 
                    placeholder="Descrição" 
                    required
                    {...register('description')}
                />
                <input 
                    type="number" 
                    placeholder="Preço" 
                    required
                    {...register('price', {valueAsNumber: true})}
                />
                <input 
                    type="text" 
                    placeholder="Categoria" 
                    required
                    {...register('category')}
                />

                <Controller //componente do hookForm para chamar o {control}
                    control={control} //envia os dados do botão selecionado
                    name="type"
                    render={({field}) => {
                        return(
                            <TransactionType onValueChange={field.onChange} value={field.value}>
                                <TransactionTypeButton variant="income" value="income">
                                    <ArrowCircleUp size={24}/>
                                        Entrada
                                </TransactionTypeButton>
                            
                                <TransactionTypeButton variant="outcome" value="outcome">
                                    <ArrowCircleDown size={24}/>
                                        Saída
                                </TransactionTypeButton>
                            </TransactionType>
                        )
                    }}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </form>

          </Content>
        
      </Dialog.Portal>
    )
    }