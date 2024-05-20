const AuthService = require('../service/AuthService.js')

const AuthController = {
    signup : async (req, res) => {
        try {
            const token = await AuthService.signup(req.body);
            res.status(201).json({ success: true, token });
        } catch (error) {
            console.error('Error signing up:', error);
            res.status(500).json({ success: false, error: 'Failed to sign up' });
        }
    },
    signin : async (req, res) => {
        try {
            const token = await AuthService.signin(req.body);
            res.status(200).json({ success: true, token });
        } catch (error) {
            console.error('Error signing in:', error);
            let errorMessage = 'Failed to sign in';
            if (error.message === 'User not found' || error.message === 'Incorrect password') {
                errorMessage = error.message;
            }
            res.status(401).json({ success: false, error: errorMessage });
        }
    }
}

module.exports = AuthController;