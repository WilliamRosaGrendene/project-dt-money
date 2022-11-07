import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useMemo } from "react";

export function useSummary(){
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    });

    //  variavel summary somente vai ser recriada quando a transactions mudar
    const summary = useMemo( () => {
        return transactions.reduce(
            (acc, transactions) => {
                if(transactions.type === 'income'){
                    acc.income += transactions.price;
                    acc.total += transactions.price;
                }else{
                    acc.outcome += transactions.price;
                    acc.total -= transactions.price;
                }
    
                return acc;
    
            },
            {
                income: 0,
                outcome: 0,
                total: 0
            }
        )
    }, [transactions])

    return summary;
}