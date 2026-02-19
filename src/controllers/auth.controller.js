const googleAuthService = require('../services/google-auth.service')
const userAccountService = require("../services/user-account.service")
const jwtService = require('../utils/jwt')

exports.googleLogin = async (req, res) => {

    if (!req.body.idToken) {
        return res.status(400).json({ message: 'ID token is required' })
    }

    try {
        const { idToken } = req.body
        const userData = await googleAuthService.verifyGoogleToken(idToken)
        const appToken = jwtService.generateAppToken(userData)

        // Simpan ke database jika belum ada (opsional)
        // await userRepository.findOrCreate(userData)
        const user = await userAccountService.userIsRegisteredAndAutoRegistered(userData)

        if (user) {
            return res.status(200).json({
                token: appToken,
                method: "existing",
                message: 'User already exists and login successfully'
            })
        } else {
            return res.status(201).json({
                token: appToken,
                method: "created",
                message: 'User created and login successfully'
            })
        }
        
    } catch (err) {
        res.status(401).json({ message: 'Invalid Login, something error' })
    }
}

exports.deleteUser = async (req, res) => {

    try {
        const user = req.user

        const deletedUser = await userAccountService.deleteUserByGoogleId(user.id)

        if (deletedUser) {
            return res.status(200).json({ message: 'User deleted successfully' })
        } else {
            return res.status(404).json({ message: 'User not found' })
        }

    } catch (err) {
        console.error('Error deleting user:', err)
        return res.status(500).json({ message: 'Internal server error' })
    }

}