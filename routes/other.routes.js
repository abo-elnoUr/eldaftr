const router = require("express").Router()
const auth = require('../app/middleware/auth')
const otherController = require('../app/controller/other.controller')

router.post('/addOther', auth, otherController.addOther)
router.get('/others', auth, otherController.others)
router.get('/other/:id', auth, otherController.other)
router.put('/updateOther/:id', auth, otherController.updateOther)
router.delete('/deleteOther/:id', auth, otherController.deleteOther)

module.exports = router