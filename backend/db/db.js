const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(`mongodb+srv://Subha-admin:8HwDCsK4EktIdnIa@cluster0.xhhtsqg.mongodb.net/expense`)
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error');
    }
}

module.exports = {db}