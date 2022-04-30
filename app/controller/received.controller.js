const receivedgModel = require('../../database/models/received.model')

class Received {
    static addReceived = async(req, res) => {
        try {
            const received = new receivedgModel({
                ...req.body,
                userId: req.user._id
            })
            await received.save();
            res.status(200).send({
                apiStatus: true,
                data: received,
                message: "received added successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }

    }
    static receiveds = async(req, res) => {
        try {
            await req.user.populate('received')
            res.status(200).send({
                apiStatus: true,
                data: req.user.received,
                message: "receiveds fetched successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static received = async(req, res) => {
        try {
            const received = await receivedgModel.findOne({ _id: req.params.id })
            res.status(200).send({
                apiStatus: true,
                data: received,
                message: "one received fetched successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: null,
                message: e.message
            })
        }
    }
    static updateReceived = async(req, res) => {
        try {
            await receivedgModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
            res.status(200).send({
                apiStatus: true,
                message: "received updated successfully 💛"
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message
            })
        }
    }
    static deleteReceived = async(req, res) => {
        try {
            await receivedgModel.findByIdAndDelete(req.params.id);
            res.status(200).send({
                apiStatus: true,
                message: "received deleted successfully 💛"
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message
            })
        }
    }
}

module.exports = Received