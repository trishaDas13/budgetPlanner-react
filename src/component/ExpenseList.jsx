import React, { useEffect } from 'react';
import { useBudget } from "../context/BudgetContext";
import { nanoid } from "nanoid";

const ExpenseList = (props) => {

    const { expenseList,setExpenseList } = useBudget(); //* contextAPI

    //todo: Set in local storage when expenseList has values
    if (expenseList.length !== 0) {
        localStorage.setItem('expenses', JSON.stringify([...expenseList]));
    } 
    
    //todo: useEffect function for get data from local storage
    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
        if (storedExpenses) {
            setExpenseList(storedExpenses);
        }
    }, []);

    //todo: function for deleting expenses
    const deleteExpense = (idx, expenseCost) =>{
        props.spentAmountDel(expenseCost);
        const newExpenseList = [...expenseList];
        newExpenseList.splice(idx, 1);
        setExpenseList(newExpenseList);
        localStorage.setItem('expenses', JSON.stringify([...newExpenseList]));
    }
    
    //todo: render Data
  return (
    <div className='expenseList'>
        {
            expenseList.length === 0 ? 
            (<p className='noData'>Add Data To List . . . . .</p>):
            (
                expenseList.map((item, idx)=>{
                    return(
                        <div key={nanoid()} className="single_expense">
                            <span>{item.reason}</span>
                            <span>{item.cost}</span>
                            <button onClick={()=> deleteExpense(idx, item.cost)}>X</button>
                        </div>
                    )
                })
            )
        }
    </div>
  )
}

export default ExpenseList