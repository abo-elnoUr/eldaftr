const userModel = require('../../database/models/user.model')
const outgoingModel = require('../../database/models/outgoing.model')
const receivedModel = require('../../database/models/received.model')
const otherModel = require('../../database/models/other.model')
const p = require("path")
const fs = require("fs")

class User {
    static register = async(req, res) => {
        try {
            const user = new userModel(req.body);
            await user.save();
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "user added successfully 💛"
            })
        } catch (e) {
            let errors = {};
            if (e.errors) {
                Object.keys(e.errors).forEach(error => {
                    errors[error] = e.errors[error].message
                })
            } else { errors.username = "username used before" }
            res.status(500).send({
                apiStatus: false,
                data: errors,
                message: e.message
            })
        }

    }
    static users = async(req, res) => {
        try {
            const users = await userModel.find()
            res.status(200).send({
                apiStatus: true,
                data: users,
                message: "all users fetched successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: null,
                message: e.message
            })
        }
    }
    static user = async(req, res) => {
        try {
            const user = await userModel.findOne({ _id: req.params.id })
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "one user fetched successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: null,
                message: e.message
            })
        }
    }
    static login = async(req, res) => {
        try {
            const userLogin = await userModel.login(req.body.username, req.body.password)
            const token = await userLogin.generateToken()
            res.status(200).send({
                apiStatus: true,
                data: { userLogin, token },
                message: "you logged in successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: null,
                message: e.message
            })
        }

    }
    static logout = async(req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(f => {
                return f.token != req.token
            })
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: "user logged out successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message
            })
        }
    }
    static deleteUser = async(req, res) => {
        try {
            await outgoingModel.deleteMany({ userId: req.user._id })
            await receivedModel.deleteMany({ userId: req.user._id })
            await otherModel.deleteMany({ userId: req.user._id })
            await userModel.findByIdAndDelete({ _id: req.user._id })
            fs.unlink(req.user.profileimage, () => {})
            res.status(200).send({
                message: "delete user successfully 💛"
            })
        } catch (e) {
            res.status(500).send(e.message)
        }
    }
    static updateUser = async(req, res) => {
        try {
            await userModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
            res.status(200).send({
                apiStatus: true,
                message: "user updated successfully 💛"
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message
            })
        }
    }
    static uploadImage = async(req, res) => {
        try {
            const imgDir = p.join(__dirname, "../../", req.file.path)
            const newDir = `${imgDir}${p.extname(req.file.originalname)}`
            fs.rename(imgDir, newDir, () => {})
            if (req.user.profileimage) {
                fs.unlink(req.user.profileimage, () => {})
            }
            req.user.profileimage = `${req.file.path}${p.extname(req.file.originalname)}`
            await req.user.save();
            res.status(200).send({
                apiStatus: true,
                message: "profile image uploaded successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message
            })
        }

    }
}

module.exports = User