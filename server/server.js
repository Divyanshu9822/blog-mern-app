const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

const port = process.env.PORT || 5500;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/blogs', require('./routes/blogsRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/upload', require('./routes/imageRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started running on port ${port}`));
