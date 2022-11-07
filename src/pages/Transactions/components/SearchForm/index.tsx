import { MagnifyingGlass } from "phosphor-react"
import { useForm } from "react-hook-form"
import { SearchFormContainer } from "./styles"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { TransactionsContext } from "../../../../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"

/* 
Por que um componete renderiza?
 - Hooks changed (mudou estado, conxtexto, reducer)
 - Props change (mudou propriedades)
 - Parent rendered (componete pai renderizou)

 Qual o fluxo de renderização?
 1. O react recria o HTML da interface daquele componete
 2. Compara a versão do HTML recriada com a versão anterior
 3. Se mudou alguma coisa, ele reescreve o HTML na tela

 Memo:
 0. Hooks change, Props changed (deep comparison)
 0.1 Comparar a versão anterior dos hooks e props
 0.2 Se mudou algo, ele vai permitir a nova renderização
*/
const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm(){

    const fetchTranssactions = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTranssactions
    })

    //desestrutura formState:{isSubmitting} para saber se os dados estão sendo pesquisados ainda
    const {register, handleSubmit, formState:{isSubmitting}} = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions( data: SearchFormInputs){
        await fetchTranssactions(data.query) // await para simular um pesquisa no banco, uma atraso no carregamento
    }

    return(
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque uma transação"
                {...register('query')}
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                 Buscar
            </button>
        </SearchFormContainer>
    )
}