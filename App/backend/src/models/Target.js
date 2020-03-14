const mongoose = require('mongoose');
const mongoosePaginate = require ('mongoose-paginate');

const TargetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
});

TargetSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Target', TargetSchema);