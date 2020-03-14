const mongoose = require('mongoose');

const DeptSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        maxlength: 200
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Target',
        required: true
    }
});

module.exports = mongoose.model('Dept', DeptSchema);