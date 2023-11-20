const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sequelize = require('./database.js');
const passport = require('passport');
const Poll = require('./models/poll');
const flash = require('connect-flash');



const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
// Initialize connect-flash middleware
app.use(flash());


// Configure session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a random, unique string.
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Passport Config
require('./passportConfig')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    next();
});


app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const poll = await Poll.findOne(); // Fetch the first poll
        if (!poll) {
            return res.render('home', { 
                error: 'No polls available' 
            });
        }

        res.render('home', {
            poll: poll,
            loggedIn: req.isAuthenticated(),
            isAdmin: req.user?.isAdmin,
            error: null,
            user: req.user,
            message: poll.status ? "Poll is currently open!" : "Poll is currently closed!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching the poll');
    }
});
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register', error: false, message: "" });
});

app.get('/login', (req, res) => {
    res.render('login', {
        error: false, // or true if there's an error
        message: '' // your error message here
    });
});

// Include auth routes after initializing passport
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const pollRoutes = require('./routes/poll');
app.use('/vote', pollRoutes);


sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync({ force: false }) // Set 'force' to true if you want to drop and recreate tables
    .then(() => {
        console.log('Tables have been synchronized');
    });

app.listen(port, () => console.log(`Server running on port ${port}`));
