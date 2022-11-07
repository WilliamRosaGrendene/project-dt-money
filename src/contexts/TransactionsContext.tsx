import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

interface Transaction{
    id: number;
    description: string;
    type: 'income' | 'outcome';
    category: string;
    price: number;
    createdAt: string;
}

interface CreateTransactionsInput{
    description: string;
    type: 'income' | 'outcome';
    category: string;
    price: number;
}

interface TransactionContextType{
    transactions: Transaction[];
    fetchTranssactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionsInput) => Promise<void>;
}

interface TransactionsProviderProps{
    children: ReactNode;
}


export const TransactionsContext = createContext({} as TransactionContextType)


export function TransactionsProvider({children}: TransactionsProviderProps){

    const[transactions, setTransactions] = useState<Transaction[]>([]) //estado que está armazenando uma lista de transactions

    const fetchTranssactions = useCallback( async (query?: string) => {
        const response = await api.get('/transactions',{ // get consulta na url da api
            params:{
                _sort: 'createdAt',
                _order: 'desc',
                q:query,
            }
        })
        setTransactions(response.data);
    }, []
    )

    const createTransaction = useCallback( async (data: CreateTransactionsInput) => {
        const {description, price, category, type} = data;

        const response = await api.post('/transactions',{ //metodo que adiciona na api a nova transaction
            description,
            price,
            category,
            type,
            createdAt: new Date()
        })

        setTransactions(state => [response.data, ...state]);
    }, []
    )

    useEffect(() => {
       fetchTranssactions();
    },[])
    return(
        <TransactionsContext.Provider value={{transactions, fetchTranssactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}