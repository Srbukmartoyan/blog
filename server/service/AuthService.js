const { Author } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { tokenExpiration } = require('../constants');


const generateToken = (userId) => {
    return jwt.sign(
        { user: { id: userId } },
        process.env.JWT_SECRET,
        { expiresIn: tokenExpiration }
    );
};

const signup = async ({ username, email, password }) => {
    const existingUserCount = await Author.count({ where: { email } });
    if (existingUserCount > 0) {
        throw new Error('An existing user is found with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Author.create({
        name: username,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user.id);

    return { token, user };
};

const signin = async ({ email, password }) => {
    const user = await Author.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Incorrect password');
    }

    const token = generateToken(user.id);

    return { token, user };
};

module.exports = { signup, signin };

