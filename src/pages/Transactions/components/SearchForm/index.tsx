import { MagnifyingGlass } from "phosphor-react"
import { useForm } from "react-hook-form"
import { SearchFormContainer } from "./styles"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm(){

    //desestrutura formState:{isSubmitting} para saber se os dados estão sendo pesquisados ainda
    const {register, handleSubmit, formState:{isSubmitting}} = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions( data: SearchFormInputs){
        await new Promise(resolve => setTimeout(resolve, 3000)); // await para simular um pesquisa no banco, uma atraso no carregamento
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