import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';


function Claims() {
    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Claims by Employee</h1>
                <span></span>
                <br />
                <br />
                {/* <h2 className="total-income">Total Expense: <span>${totalExpenses()}</span></h2> */}
                <div className="income-content">
                    <div className="form-container">
                       
                    </div>
                    <div className="incomes">

                     <IncomeItem
                               
                                title={"Travel Reimbursement"} 
                                description={"Travel Reimbursement"} 
                                amount={20000} 
                                date={"02/07/2024"} 
                                type={"Other"}
                                category={"Other"} 
                                employee = "Ajay Ganapathy K H"
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                                />

<IncomeItem
                                
                                title={"Food Expense"} 
                                description={"Food Expense"} 
                                amount={30000} 
                                date={"02/07/2024"} 
                                type={"Other"}
                                category={"Other"} 
                                employee = "Ajay Ganapathy K H"
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                                />
                                     <IncomeItem
                                
                                title={"Banner amount Reimbursement"} 
                                description={"Banner Reimbursement"} 
                                amount={2000} 
                                date={"02/07/2024"} 
                                type={"Other"}
                                category={"Other"} 
                                employee = "Ajay Ganapathy K H"
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                                />
                        {/* {expenses.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            console.log(income)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                employee = "Ajay Ganapathy K H"
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                                
                            />
                        })} */}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Claims