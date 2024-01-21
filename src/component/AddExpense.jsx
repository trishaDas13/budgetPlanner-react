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
    } else alert("Please fill out all fields");
    props.spentAmount();
    props.remainingAmount();
  }

  //todo: render Data
  return (
    <div className="addExpense">
      <h2>Add Expenses</h2>
      <div className="name">
        <label htmlFor="name">Reason</label>
        <input
          type="text"
          onChange={(e) => setReason(e.target.value)}
          value={reason}
        />
      </div>
      <div className="cost">
        <label htmlFor="cost">Cost</label>
        <input
          type="number"
          min={0}
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>
      <button onClick={addExpense}>Save</button>
    </div>
  );
};

export default AddExpense;
