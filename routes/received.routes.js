const router = require("express").Router()
const auth = require('../app/middleware/auth')
const receivedController = require('../app/controller/received.controller')

router.post('/addReceived', auth, receivedController.addReceived)
router.get('/receiveds', auth, receivedController.receiveds)
router.get('/received/:id', auth, receivedController.received)
router.put('/updateReceived/:id', auth, receivedController.updateReceived)
router.delete('/deleteReceived/:id', auth, receivedController.deleteReceived)

module.exports = router