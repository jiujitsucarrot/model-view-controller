require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const { Sequelize } = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

// Database connection setup
const connection = require('./config/connection');

// Engine setup
app.engine('handlebars', require('express-handlebars')({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

