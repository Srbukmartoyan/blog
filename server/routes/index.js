const express = require('express');
const app = express();

const authRoutes = require('./authRoutes.js');
const postRoutes = require('./postRoutes.js');
const hashtagRoutes = require('./hashtagRoutes.js');
const fileUploadRoutes = require('./fileUploadRoutes.js');
const userRoutes = require('./userRoutes.js');
const friendRequestRoutes = require('./friendRequestRoutes.js');

app.use(authRoutes);
app.use('/posts', postRoutes);
app.use('/hashtags', hashtagRoutes);
app.use('/upload', fileUploadRoutes);
app.use('/users', userRoutes);
app.use('/friendRequest', friendRequestRoutes);

module.exports = app; 
