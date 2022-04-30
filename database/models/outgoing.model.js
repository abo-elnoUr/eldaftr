const mongoose = require("mongoose")

const outgoingSchema = mongoose.Schema({
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
    outto: {
        type: String,
        trim: true,
        required: [true, "(out to ) is required"]
    },
    desc: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
})

const OutGoing = mongoose.model('OutGoing', outgoingSchema)

module.exports = OutGoing