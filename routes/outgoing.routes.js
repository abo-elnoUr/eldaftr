const router = require("express").Router()
const auth = require('../app/middleware/auth')
const outGoingController = require('../app/controller/outgoing.controller')

router.post('/addOutgoing', auth, outGoingController.addOutgoing)
router.get('/outgoings', auth, outGoingController.outgoings)
router.get('/outgoing/:id', auth, outGoingController.outgoing)
router.put('/updateOutgoing/:id', auth, outGoingController.updateOutgoing)
router.delete('/deleteOutgoing/:id', auth, outGoingController.deleteOutgoing)

module.exports = router