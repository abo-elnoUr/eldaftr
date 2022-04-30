const mongoose = require("mongoose")

const otherSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    amount: {
        type: Number,
        trim: true,
        required: [true, "amount is required"],
        min: [1, 'amount must be greater than 1']
    },
    reason: {
        type: String,
        trim: true,
        required: [true, "reason is required"]
    }
}, {
    timestamps: true
})

const Other = mongoose.model('Other', otherSchema)

module.exports = Other