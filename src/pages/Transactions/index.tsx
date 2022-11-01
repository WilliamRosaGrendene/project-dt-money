import { useContext, useEffect, useState } from "react"
import {Header} from "../../components/Header"
import { Summary } from "../../components/Summary"
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { dateFormatter, priceFormatter } from "../../utils/formatter"
import { SearchForm } from "./components/SearchForm"
import { PrinceHighLight, TransactionsContainer, TransactionTable } from "./styles"


export function Transactions() {

    const{transactions} = useContext(TransactionsContext);

    return(
        <div>
            <Header/>
            <Summary/>

           <TransactionsContainer>
           <SearchForm/>
           
           <TransactionTable>
                <tbody>
                    {transactions.map(transactions => {
                        return(
                        <tr key={transactions.id}>
                            <td width="50%">{transactions.description}</td>
                            <td>
                                <PrinceHighLight variant={transactions.type}> 
                                    {transactions.type === 'outcome' && '- '}
                                    {priceFormatter.format(transactions.price)}
                                </PrinceHighLight>
                            </td>
                            <td>{transactions.category}</td>
                            <td>{dateFormatter.format(new Date(transactions.createdAt))}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </TransactionTable>
           </TransactionsContainer>
        </div>
    )
}