const mongoose = require("mongoose")

const receivedSchema = mongoose.Schema({
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
    comefrom: {
        type: String,
        trim: true,
        required: [true, "( come from ) is required"]
    },
    desc: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
})

const Received = mongoose.model('Received', receivedSchema)

module.exports = Received