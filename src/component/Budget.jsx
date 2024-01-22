import React, { useState, useEffect, useReducer } from "react";
import ExpenseList from "./ExpenseList";
import AddExpense from "./AddExpense";
import { useBudget } from "../context/BudgetContext";

const reducer = (state, action) =>{
  switch(action.type){
    case 'ADD100':
      return state + 100
     case 'ADD500':
      return state + 500
    case 'ADD1000':
      return state + 1000
    case 'SET_BUDGET':
      return action.payload
    case 'RESET' :
      return 2000;
    default :
      return state;
  }
}

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

  const initState  = JSON.parse(localStorage.getItem("budget")) || 2000; //* use reducer
  const[state, dispatch] = useReducer(reducer, initState ); 

  //todo: set in the local storage >> all useEffect fn.
  useEffect(() => {
    localStorage.setItem("spent", JSON.stringify(spent));
  }, [spent]);

  useEffect(() => {
    localStorage.setItem("remaining", JSON.stringify(remaining));
  }, [remaining]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(state));
    setRemaining(prevRemaining => prevRemaining + (state - initState));
  }, [state]);

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
  //todo: Dispatch the RESET action and update remaining to 2000
  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setRemaining(state);
  };

  return (
    <>
      <nav> 💰 My Budget Planner</nav>
      <main>
        <div className="budget">
          <p>Budget : {state}</p>
          <p>Remaining : {remaining}</p>
          <p>Spent so far : {spent}</p>
        </div>
        <div className="increasebtns">
          <h3>Add Budget :</h3>
          <button onClick={() => dispatch({type: "ADD100"})}> + 100 </button>
          <button onClick={() => dispatch({type: "ADD500"})}> + 500 </button>
          <button onClick={() => dispatch({type: "ADD1000"})}> + 1000 </button>
          <button onClick={handleReset}> Reset </button>
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
