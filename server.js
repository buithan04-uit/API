const express = require('express');
const authRoutes = require('./route/Route');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8888;
const hostname = process.env.HOST || 'localhost';

// confid req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// khai bao route
app.use('/api/', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})