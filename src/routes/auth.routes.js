const router = require('express').Router()
const authController = require('../controllers/auth.controller');
const authenticateToken = require('../middleware/authorization-user')

router.post('/google-login', authController.googleLogin)
router.delete('/delete-account', authenticateToken, authController.deleteUser)

module.exports = router
