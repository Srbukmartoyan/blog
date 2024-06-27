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
    const refreshToken = generateToken(user.id, process.env.JWT_REFRESH_SECRET, refreshTokenExpiration);

    const userData = {
        id: user.id,
        name: user.name,
        email: user.email
    };
    return { accessToken, refreshToken, user: userData };
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
    const refreshToken = generateToken(user.id, process.env.JWT_REFRESH_SECRET, refreshTokenExpiration);
    const userData = {
        id: user.id,
        name: user.name,
        email: user.email
    };
    return { accessToken, refreshToken, user: userData };
};

const refreshToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const userId = decoded.user.id;
        const newAccessToken = generateToken(userId, process.env.JWT_ACCESS_SECRET, accessTokenExpiration);
        return newAccessToken;
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};

module.exports = { signup, signin, refreshToken };

