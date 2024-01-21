import React, { useState, useEffect } from "react";
import ExpenseList from "./ExpenseList";
import AddExpense from "./AddExpense";
import { useBudget } from "../context/BudgetContext";

const Budget = () => {
  const { cost } = useBudget(); //* contextAPI

  //todo: useState variables and get from local storage
  const [remaining, setRemaining] = useState(
    localStorage.getItem("remaining")
      ? JSON.parse(localStorage.getItem("remaining"))
      : 2000
  );

  const [spent, setSpent] = useState(
    localStorage.getItem("spent")
      ? JSON.parse(localStorage.getItem("spent"))
      : 0
  );

  //todo: set in the local storage
  useEffect(() => {
    localStorage.setItem("spent", JSON.stringify(spent));
  }, [spent]);

  useEffect(() => {
    localStorage.setItem("remaining", JSON.stringify(remaining));
  }, [remaining]);

  //todo: function to handle spent and remaining value
  function spentAmountSave() {
    let newSpent = parseInt(cost) + parseInt(spent);
    setSpent(newSpent);
  }
  function remainingAmountSave() {
    let newRemain = parseInt(remaining) - parseInt(cost);
    setRemaining(newRemain);
  }
  function spentAmountDel(deletedExpenseCost) {
    setSpent((prevSpent) => parseInt(prevSpent) - parseInt(deletedExpenseCost));
    setRemaining((prevRemaining) => parseInt(prevRemaining) + parseInt(deletedExpenseCost));
  }

  return (
    <>
      <nav> 💰 My Budget Planner</nav>
      <main>
        <div className="budget">
          <p>Budget : 2000</p>
          <p>Remaining : {remaining}</p>
          <p>Spent so far : {spent}</p>
        </div>

        <AddExpense
          spentAmount={spentAmountSave}
          remainingAmount={remainingAmountSave}
          remaining = {remaining}
        />
        <ExpenseList spentAmountDel={spentAmountDel} />
      </main>
    </>
  );
};

export default Budget;
