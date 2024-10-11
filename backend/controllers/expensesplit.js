// controllers/expenseSplitController.js
const ExpenseSplit = require('../models/ExpenseBetweenOrgsModel');

exports.addExpenseSplit = async (req, res) => {
    const { project, companies, totalAmount, description } = req.body;
    console.log(req.body)

    try {
        // Validations
        if (!project ||  !totalAmount ) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        
        // Validate companies structure
        if (!Array.isArray(companies) || companies.length === 0) {
            return res.status(400).json({ message: 'Companies must be an array and cannot be empty!' });
        }

        const totalAllocated = companies.reduce((sum, company) => sum + company.amount, 0);

        if (totalAllocated !== totalAmount) {
            return res.status(400).json({ message: 'The sum of allocated amounts must equal the total amount!' });
        }

        const expenseSplit = new ExpenseSplit({
            project,
            companies,
            totalAmount,
            description,
        });

        await expenseSplit.save();
        res.status(201).json({ message: 'Expense Added', expenseSplit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getExpenseSplits = async (req, res) => {
    try {
        const expenseSplits = await ExpenseSplit.find().sort({ createdAt: -1 });
        res.status(200).json(expenseSplits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteExpenseSplit = async (req, res) => {
    const { id } = req.params;

    try {
        const expenseSplit = await ExpenseSplit.findByIdAndDelete(id);
        if (!expenseSplit) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
