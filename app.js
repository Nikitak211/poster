//Third parte packages
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// .env confing
require('dotenv').config();

//mongoose promise
mongoose.Promise = global.Promise

//My imports
const ApiRoutes = require('./routes/auth')

// your URI for mongoDB from .env file.
const mongoDBUri = process.env.MongoDBUri

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
    secret: 'slob that bob top',
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

app.use('/api', ApiRoutes)
app.use('/static', express.static(path.join(__dirname, 'public')))

