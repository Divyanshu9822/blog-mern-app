const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

const port = process.env.PORT || 5500;

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/blogs', require('./routes/blogsRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/upload', require('./routes/imageRoutes'));

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started running on port ${port}`));
