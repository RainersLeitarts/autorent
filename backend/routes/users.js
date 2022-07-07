const express = require('express')
const router = express.Router()
const { registerUser, loginUser, refreshToken, logoutUser } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/refreshToken', refreshToken)
router.delete('/logout', logoutUser)

module.exports = router