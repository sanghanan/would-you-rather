const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sequelize = require('./database.js');
const passport = require('passport');
const Poll = require('./models/poll');
const flash = require('connect-flash');

const app = express();
app.use(express.static('public'));
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());

// Configure session middleware
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Passport Configuration
require('./passportConfig')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    next();
});

app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
    try {
        const poll = await Poll.findOne();
        if (!poll) {
            return res.render('home', { error: 'No polls available' });
        }

        let message = null;
        if (req.isAuthenticated()) {
            message = poll.status ? "Poll is currently open!" : "Poll is currently closed!";
        }

        res.render('home', {
            poll: poll,
            loggedIn: req.isAuthenticated(),
            isAdmin: req.user?.isAdmin,
            error: null,
            user: req.user,
            message: message
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching the poll');
    }
});

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        error: req.flash('error'),
        message: ""
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        error: req.flash('error'),
    });
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const pollRoutes = require('./routes/poll');
app.use('/vote', pollRoutes);

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tables have been synchronized');
    });

// Listen on the port only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;
