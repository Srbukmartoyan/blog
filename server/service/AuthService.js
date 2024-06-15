const { Author } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { accessTokenExpiration, refreshTokenExpiration } = require('../constants');


const generateToken = (userId, secretKey, expiresIn) => {
    return jwt.sign(
        { user: { id: userId } },
        secretKey,
        { expiresIn }
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

    const accessToken = generateToken(user.id,  process.env.JWT_ACCESS_SECRET, accessTokenExpiration);
    const refreshToken = generateRefreshToken(user.id, process.env.JWT_REFRESH_SECRET, refreshTokenExpiration);
    return { accessToken, refreshToken, user };
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


    const accessToken = generateToken(user.id, process.env.JWT_ACCESS_SECRET, accessTokenExpiration);
    const refreshToken = generateRefreshToken(user.id, process.env.JWT_REFRESH_SECRET, refreshTokenExpiration);
    return { accessToken, refreshToken, user };
};

module.exports = { signup, signin };

