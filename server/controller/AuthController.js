const { signup: signupService, signin: signinService } = require('../service/AuthService.js');
const { checkRequiredFields } = require('../middleware/errorHandler.js');
const { ValidationError } = require('sequelize');

const signup = async (req, res) => {
    try {
        const token = await signupService(req.body);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error('Error signing up:', error);
        if (error instanceof ValidationError) {
            const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
            return res.status(400).json({ success: false, errors });
        }
        res.status(409).json({ success: false, error: error.message });
    }
};

const signin = async (req, res) => {
    const requiredFields = ['email', 'password'];
    const missingFieldError = checkRequiredFields(req.body, requiredFields);
 
    if (missingFieldError) {
        const { statusCode, message } = missingFieldError;
        return res.status(statusCode).json({ error: message });
    }

    try {
        const token = await signinService(req.body);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error signing in:', error);
        const statusCode = 401;
        res.status(statusCode).json({ success: false, error: error.message });
    }
}

module.exports = { signup, signin };