const express = require('express');
const recipeRoutes = require('./routes/recipeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const difficultyRoutes = require('./routes/difficultyRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const materialRoutes = require('./routes/materialRoutes');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(recipeRoutes);
app.use(categoryRoutes);
app.use(difficultyRoutes);
app.use(ingredientRoutes);
app.use(materialRoutes);


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