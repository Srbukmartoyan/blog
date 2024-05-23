const { Author } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthService = {
    signup: async ({ username, email, password }) => {
        const existingUser = await Author.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('An existing user is found with this email');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Author.create({
            name: username,
            email,
            password: hashedPassword,
        });

        const tokenExpiration = '2h'; 

        const token = jwt.sign(
            { user: { id: user.id } },
            process.env.JWT_SECRET,
            { expiresIn: tokenExpiration }
        );

        return token;
    },
    signin: async ({ email, password }) => {
        const user = await Author.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }
        
        const tokenExpiration = '2h'; 

        const token = jwt.sign(
            { user: { id: user.id } },
            process.env.JWT_SECRET,
            { expiresIn: tokenExpiration }
        );

        return token;
    }
}

module.exports = AuthService;

