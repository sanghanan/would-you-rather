const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');



const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(session({
    secret: 'your-secret-key', // Change this to a random, unique string.
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.listen(port, () => console.log(`Server running on port ${port}`));