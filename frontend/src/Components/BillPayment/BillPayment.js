import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext'; // Assuming you have a context to manage expenses

function BillPayments() {
    const {  payBill ,  addExpense} = useGlobalContext();
    const [inputState , setInputState] = useState([]);
    const splitExpenses = [
        {
            id: 1,
            project: 'Project A',
            company: 'Company 1',
            totalAmount: 5000000,
            description: 'Initial payment for project A',
            paid: false,
        },
        {
            id: 2,
            project: 'Project A',
            company: 'Company 2',
            totalAmount: 3000000,
            description: 'Second payment for project A',
            paid: true,
        },
        {
            id: 3,
            project: 'Project B',
            company: 'Company 1',
            totalAmount: 70000,
            description: 'Payment for project B services',
            paid: false,
        },
        {
            id: 4,
            project: 'Project C',
            company: 'Company 3',
            totalAmount: 4500000,
            description: 'Final payment for project C',
            paid: true,
        },
        {
            id: 5,
            project: 'Project B',
            company: 'Company 2',
            totalAmount: 600000,
            description: 'Advance payment for project B',
            paid: false,
        },
        {
            id: 6,
            project: 'Project A',
            company: 'Company 3',
            totalAmount: 800000,
            description: 'Consultation fee for project A',
            paid: true,
        },
        {
            id: 7,
            project: 'Project C',
            company: 'Company 1',
            totalAmount: 900000,
            description: 'Payment for additional services on project C',
            paid: false,
        },
    ];

    


    const handlePayment = async (expense) => {
        // Show confirmation dialog using SweetAlert
        const result = await Swal.fire({
            title: 'Confirm Payment',
            text: "Are you sure you want to mark this bill as paid?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, pay it!',
            cancelButtonText: 'Cancel'
        });
        setInputState({
            title:  expense.project ,
            amount: expense.totalAmount,
            date: new Date(),
            category: "Project Expense ",
            description:  expense.description ,
        })
       
        
           
        if (result.isConfirmed) {
            addExpense(inputState)
            console.log(inputState)
            setInputState({
                title:  '' ,
                amount: '',
                date: new Date(),
                category: '',
                description:  '',
            })
            splitExpenses[expense.id+1].paid = true;

            // Call the payBill function to process the payment
           // await payBill(expenseId);
            Swal.fire('Paid!', 'The bill has been marked as paid.', 'success');
        }
    };

   
    return (
        <ViewRequestsStyled>
            <h2>Split Expense Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Company</th>
                        <th>Total Amount</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {splitExpenses.map(expense => (
                        <tr key={expense.id}>
                            <td>{expense.project}</td>
                            <td>{expense.company}</td>
                            <td>{expense.totalAmount}</td>
                            <td>{expense.description}</td>
                            <td>{expense.paid ? 'Paid' : 'Pending'}</td>
                            <td>
                                {!expense.paid && (
                                    <Link 
                                    to="/payment" 
                                    state={{ "cost": expense.totalAmount }} 
                                    style={{
                                        backgroundColor: '#4CAF50', // Green background
                                        color: 'white', // White text color
                                        padding: '0.5rem 1rem', // Padding
                                        textDecoration: 'none', // No underline
                                        borderRadius: '5px', // Rounded corners
                                        transition: 'background-color 0.3s', // Transition effect
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'} // Darker green on hover
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'} // Reset to original color
                                >
                                    Pay Bill
                                </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ViewRequestsStyled>
    );
}

const ViewRequestsStyled = styled.div`
    padding: 2rem;
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:hover {
            background-color: #f1f1f1;
        }
    }
    button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
        &:hover {
            background-color: #45a049; /* Darker green */
        }
    }
`;

export default BillPayments;
