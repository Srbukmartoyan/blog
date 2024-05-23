const AuthService = require('../service/AuthService.js');
const { ValidationError } = require('sequelize');

const AuthController = {
    signup : async (req, res) => {
        try {
            const token = await AuthService.signup(req.body);
            res.status(201).json({ success: true, token });
        } catch (error) {
            console.error('Error signing up:', error);
            if (error instanceof ValidationError) {
                const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
                return res.status(400).json({ success: false, errors });
            }
            res.status(409).json({ success: false, error: error.message });
        }
    },
    signin : async (req, res) => {
        try {
            const token = await AuthService.signin(req.body);
            res.status(200).json({ success: true, token });
        } catch (error) {
            console.error('Error signing in:', error);
            let statusCode = 401;
            if (error.message === 'email must not be empty' || error.message === 'password must not be empty') {
                statusCode = 400
            }
            res.status(statusCode).json({ success: false, error: error.message });
        }
    }
}

module.exports = AuthController;