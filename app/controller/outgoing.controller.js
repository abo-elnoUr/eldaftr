const outgoingModel = require('../../database/models/outgoing.model')

class Outgoing {
    static addOutgoing = async(req, res) => {
        try {
            const outgoing = new outgoingModel({
                ...req.body,
                userId: req.user._id
            })
            await outgoing.save();
            res.status(200).send({
                apiStatus: true,
                data: outgoing,
                message: "outgoing added successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }

    }
    static outgoings = async(req, res) => {
        try {
            await req.user.populate('outgoing')
            res.status(200).send({
                apiStatus: true,
                data: req.user.outgoing,
                message: "outgoings fetched successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static outgoing = async(req, res) => {
        try {
            const outgoing = await outgoingModel.findOne({ _id: req.params.id })
            res.status(200).send({
                apiStatus: true,
                data: outgoing,
                message: "one outgoing fetched successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: null,
                message: e.message
            })
        }
    }
    static updateOutgoing = async(req, res) => {
        try {
            await outgoingModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
            res.status(200).send({
                apiStatus: true,
                message: "outgoing updated successfully 💛"
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message
            })
        }
    }
    static deleteOutgoing = async(req, res) => {
        try {
            await outgoingModel.findByIdAndDelete(req.params.id);
            res.status(200).send({
                apiStatus: true,
                message: "outgoing deleted successfully 💛"
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message
            })
        }
    }
}

module.exports = Outgoing