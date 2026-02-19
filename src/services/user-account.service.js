const userModel = require('../models/user.model')

exports.deleteUserByGoogleId = async (googleId) => {
    try {
        const result = await userModel.deleteOne({ googleId })
        return result.deletedCount > 0
    } catch (err) {
        console.error('Error deleting user:', err)
        return false
    }
}

exports.userIsRegisteredAndAutoRegistered = async (userData) => {
    const user = await userModel.findOne({ googleId: userData.googleId })
    if (!user) {
        await userModel.create(userData)
        return null
    }else {
        return user
    }
}