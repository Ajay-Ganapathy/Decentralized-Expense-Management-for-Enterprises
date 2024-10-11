// models/ExpenseBetweenOrgs.js
const mongoose = require('mongoose');

const ExpenseBetweenOrgsSchema = new mongoose.Schema({
    project: { type: String, required: true },
    companies: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    description: { type: String, required: true },
    paid: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('ExpenseBetweenOrgs', ExpenseBetweenOrgsSchema);
