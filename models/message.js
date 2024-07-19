const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    food: { type: Number, required: true },
    travel: { type: Number, required: true },
    rent: { type: Number, required: true }
});

module.exports = mongoose.model('Message', messageSchema);
