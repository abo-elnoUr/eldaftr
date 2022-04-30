const otherModel = require('../../database/models/other.model')

class Other {
    static addOther = async(req, res) => {
        try {
            const received = new otherModel({
                ...req.body,
                userId: req.user._id
            })
            await received.save();
            res.status(200).send({
                apiStatus: true,
                data: received,
                message: "other added successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }

    }
    static others = async(req, res) => {
        try {
            await req.user.populate('other');
            res.status(200).send({
                apiStatus: true,
                data: req.user.other,
                message: "others fetched successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
    }
    static other = async(req, res) => {
        try {
            const other = await otherModel.findOne({ _id: req.params.id })
            res.status(200).send({
                apiStatus: true,
                data: other,
                message: "one other fetched successfully 💛"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: null,
                message: e.message
            })
        }
    }
    static updateOther = async(req, res) => {
        try {
            await otherModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
            res.status(200).send({
                apiStatus: true,
                message: "other updated successfully 💛"
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message
            })
        }
    }
    static deleteOther = async(req, res) => {
        try {
            await otherModel.findByIdAndDelete(req.params.id);
            res.status(200).send({
                apiStatus: true,
                message: "other deleted successfully 💛"
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: e.message
            })
        }
    }
}

module.exports = Other