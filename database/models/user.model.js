const mongoose = require("mongoose")
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const outgoingModel = require('../models/outgoing.model')
const receivedModel = require('../models/received.model')
const otherModel = require('../models/other.model')

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "first name is required"],
        minlength: [3, "first name must be greater than 3 character"],
    },
    lname: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "last name is required"],
        minlength: [3, "last name must be greater than 3 character"],
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: [true, "username must be uniqe"],
        lowercase: [true, "username is required"],
        minlength: [3, "username must be greater than 3 character"],
    },
    phone: {
        type: String,
        trim: true,
        required: [true, 'phone is required'],
        validate(value) {
            if (!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('phone not valid!')
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: [6, "password can not be less than 6 character"],
        required: [true, "password is required"],
        match: [/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, 'password must contain *number* *uppercase* and *lowercase*'],
        validate(value) {
            if (value.includes(this.fname) || value.includes(this.lname)) throw new Error("password can not contain your name")
        }
    },
    profileimage: {
        type: String,
        default: ''
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('outgoing', {
    ref: "OutGoing",
    localField: "_id",
    foreignField: "userId"
})
userSchema.virtual('received', {
    ref: "Received",
    localField: "_id",
    foreignField: "userId"
})
userSchema.virtual('other', {
    ref: "Other",
    localField: "_id",
    foreignField: "userId"
})

userSchema.methods.toJSON = function() {
    const data = this.toObject();
    delete data.password;
    delete data.__v;
    return data
}

userSchema.pre('save', async function() {
    const data = this;
    if (data.isModified('password'))
        data.password = await bcryptjs.hash(data.password, 10)
})

// userSchema.pre('findByIdAndDelete', async function() {
//     await outgoingModel.findByIdAndDelete(this._id)
//     await receivedModel.findByIdAndDelete(this._id)
//     await otherModel.findByIdAndDelete(this._id)
// })

userSchema.statics.login = async(username, password) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('username not found or invalid!');
    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) throw new Error('password not correct!');
    return user;
}

userSchema.methods.generateToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWTKEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

const User = mongoose.model('User', userSchema)

module.exports = User