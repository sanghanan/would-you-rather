const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sequelize = require('./database.js');
const authRoutes = require('./routes/auth');


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});



app.use(session({
    secret: 'your-secret-key', // Change this to a random, unique string.
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync({ force: false }) // Set 'force' to true if you want to drop and recreate tables
    .then(() => {
        console.log('Tables have been synchronized');
    });
app.listen(port, () => console.log(`Server running on port ${port}`));