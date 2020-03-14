const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    accountNumber: String,
    balance: {
        type: Number,
        default: 0,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Bank', BankSchema);