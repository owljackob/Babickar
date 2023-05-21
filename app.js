const express = require('express');
const receiptRoutes = require('./routes/receiptRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const sequelize = require('./config/database');

const app = express();

app.use(receiptRoutes);
app.use(categoryRoutes);


sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected!');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((error) => {
        console.log('Unable to connect to the database:', error);
    });