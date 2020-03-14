const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    limit: {
        type: Number
    },
    actualValue: {
        type: Number,
        required: true,
        default: 0 
    },
    cardBank: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Card', CardSchema);