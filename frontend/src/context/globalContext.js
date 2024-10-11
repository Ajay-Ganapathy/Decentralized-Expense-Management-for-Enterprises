import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [splitExpenses, setSplitExpenses] = useState([]); // State for split expenses
    const [error, setError] = useState(null);

    // Income Functions
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income).catch((err) => {
            setError(err.response.data.message);
        });
        getIncomes();
    };

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`);
        setIncomes(response.data);
        console.log(response.data);
    };

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`);
        getIncomes();
    };

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // Expense Functions
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense).catch((err) => {
            setError(err.response.data.message);
        });
        getExpenses();
    };

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`);
        setExpenses(response.data);
        console.log(response.data);
    };

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`);
        getExpenses();
    };

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    // Split Expense Functions
    const addSplitExpense = async (splitExpense) => {
        const response = await axios.post(`${BASE_URL}add-split-expense`, splitExpense).catch((err) => {
            setError(err.response.data.message);
        });
        getSplitExpenses();
    };

    const getSplitExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-split-expenses`);
        setSplitExpenses(response.data);
        console.log(response.data);
    };

    const deleteSplitExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-split-expense/${id}`);
        getSplitExpenses();
    };

    const totalSplitExpenses = () => {
        return splitExpenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses() - totalSplitExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses, ...splitExpenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            addSplitExpense,        // Add split expense function
            getSplitExpenses,       // Get split expenses function
            splitExpenses,          // Split expenses state
            deleteSplitExpense,     // Delete split expense function
            totalSplitExpenses       // Calculate total split expenses
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
