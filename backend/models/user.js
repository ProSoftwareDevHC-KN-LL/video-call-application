const mongoose = require('mongoose')

const userSchema = mongoose.Schema ({
    username: {type: String, required: True, unique: True },
    email: {type: String, required: True,unique: True, lowercase: True },
    password: {type: String, required: True },
    phoneNumber: {type: String, requried: True },
    profilePicture: {type: String},
    status: {
        type: String,
        enum: ['online', 'offline','busy', 'away'],
        default: ['online']
    },
    lastSeen: { type: Date, default: Date.now },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);