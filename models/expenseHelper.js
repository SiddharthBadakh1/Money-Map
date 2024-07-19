const mongoose = require('mongoose');
const Message = require('./message'); // Adjust the path if necessary

async function getExpenses() {
    const result = await Message.aggregate([
        {
            $group: {
                _id: null,
                totalFood: { $sum: '$food' },
                totalTravel: { $sum: '$travel' },
                totalRent: { $sum: '$rent' }
            }
        }
    ]);

    return result[0];
}

async function getExpensePercentages() {
    const totals = await getExpenses();
    const total = totals.totalFood + totals.totalTravel + totals.totalRent;

    return {
        foodPercentage: (totals.totalFood / total) * 100,
        travelPercentage: (totals.totalTravel / total) * 100,
        rentPercentage: (totals.totalRent / total) * 100
    };
}

module.exports = { getExpensePercentages };
