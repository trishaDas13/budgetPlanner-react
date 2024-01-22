import React, { useState } from "react";
import { useBudget } from "../context/BudgetContext";

const AddExpense = (props) => {
  const { expenseList, setExpenseList, cost, setCost } = useBudget(); //* contextAPI

  //todo: state varriables
  const [reason, setReason] = useState("");

  //todo: Function to handle adding expenses
  function addExpense() {
    if (reason && cost) {
      let newExpense = { reason, cost };
      setExpenseList([...expenseList, newExpense]);
      setReason("");
      setCost("");
    } else {
      alert("Please fill out all fields");
      return;
    }
    props.spentAmount();
    props.remainingAmount();
  }
  const isDisabled = props.remaining <= 0;

  

  //todo: render Data
  return (
    <div className="addExpense">
      <input
        type="text"
        onChange={(e) => setReason(e.target.value)}
        value={reason}
        placeholder="What's the purpose of this expense?"
        className="reason"
        disabled={isDisabled}
      />
      <input
        type="number"
        min={0}
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Cost"
        className="cost"
        disabled={isDisabled}
      />
      <button 
        className="save" 
        onClick={addExpense} 
        disabled={isDisabled}
      >Add Expense</button>
    </div>
  );
};

export default AddExpense;
