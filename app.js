//Third party packeges
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// require packege for the .env file
require('dotenv').config()

mongoose.Promise = global.Promise

//My imports
const login = require('./routes/login');
const register = require('./routes/register');
const logout = require('./routes/logout');
const AuthRoute = require('./routes/auth')

// MongoDBUri form env file goes here.
const mongoDBUri = process.env.MONGODB_URI

mongoose.connect(mongoDBUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.connection.once('open', function () {
    console.log('connection is success!! ');
}).on('error', function (error) {
    console.log('***connection not available***', error);
});

const store = new MongoDBStore({
    uri: mongoDBUri,
    collection: 'database'
});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
}))

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.sendFile(path.resolve(__dirname, 'public/login/login.html'))
    }
}

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/register/register.html'))
})

app.get('/', isAuth, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/homepage/homepage.html'))
})

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//body parser Midware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', AuthRoute)
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(login)
app.use(register)
app.use(logout)
