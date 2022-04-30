const router = require("express").Router()
const auth = require('../app/middleware/auth')
const userController = require('../app/controller/user.controller')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });


router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/users', auth, userController.users)
router.get('/user/:id', auth, userController.user)
router.delete('/deleteUser/:id', auth, userController.deleteUser)
router.put('/updateUser/:id', auth, userController.updateUser)
router.get('/logout', auth, userController.logout)
router.post('/uploadImage', auth, upload.single('profile'), userController.uploadImage)


module.exports = router