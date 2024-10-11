import {dashboard, expenses, transactions, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/income",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/expenses",
    },
    {
        id: 5,
        title: "Claims",
        icon: expenses,
        link: "/claims",
    },
    // {
    //     id: 6,
    //     title: "Payment",
    //     icon: expenses,
    //     link: "/payment",
    // },
    {
        id: 7,
        title: "Split Expenses",
        icon: expenses,
        link: "/expensesplit",
    },
    {
        id: 8,
        title: "View Payment Requests for Joint Venture Projects",
        icon: expenses,
        link: "/viewrequests",
    },
]