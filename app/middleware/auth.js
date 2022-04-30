const jwt = require('jsonwebtoken')
const User = require('../../database/models/user.model')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('bearer ', '');
        const decode = jwt.verify(token, process.env.JWTKEY);
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
        // res.send(user)
        if (!user) throw new Error('user not found 🥴');
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "you are un authorized 💀"
        })
    }
}

module.exports = auth