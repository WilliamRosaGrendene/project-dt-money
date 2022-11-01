import { ThemeProvider } from "styled-components";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { Transactions } from "./pages/Transactions";
import { GLobalsStyle } from "./styles/globals";
import { defaultTheme } from "./styles/themes/default";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GLobalsStyle/>

      <TransactionsProvider>
          <Transactions/>
      </TransactionsProvider>

   </ThemeProvider>
  )
}

