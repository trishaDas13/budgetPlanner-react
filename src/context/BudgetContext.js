import React, { useContext, useState } from "react";
import { createContext } from "react";

//todo: create Context here
const BudgetContexts = createContext({});

const BudgetContext = (props) => {
  const [expenseList, setExpenseList] = useState([]);
  const [cost, setCost] = useState("");

  return (
    <BudgetContexts.Provider value={{ expenseList, setExpenseList, cost, setCost }}>
      {props.children}
    </BudgetContexts.Provider>
  );
};

export const useBudget = () => {
  return useContext(BudgetContexts);
};

export default BudgetContext;
