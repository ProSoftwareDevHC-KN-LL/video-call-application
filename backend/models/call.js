const mongoose = require('mongoose')

const callSchema = mongoose.Schema({
    caller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: True
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: True
    },
    status: {
        type: String,
        enum: ['started', 'ringing', 'answered', 'missed', 'ended'],
        default: ['started']
    },
    startTime: {type: Date},
    endTime: {type: Date},
    duration: { type: Number },
    type: {
        type: String,
        enum: ['audio', 'video'],
        required: true
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, 'ref': 'User'}],
    recordingUrl: {type: String},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.Model("Call", callSchema)