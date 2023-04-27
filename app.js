const express = require('express');
const userRoutes = require('./routes/receiptRoutes');
const sequelize = require('./config/database');

const app = express();

app.use(userRoutes);

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected!');
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((error) => {
        console.log('Unable to connect to the database:', error);
    });