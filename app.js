const express = require('express');
const path = require('path');
const register = require('./api/registerRouter');
const app = express();
const mongoose = require('mongoose');
const AuthRoute = require('./routes/auth')
const session = require('express-session');
const User = require('./models/user')
const bcrypt = require('Bcryptjs')
const jwt = require('jsonwebtoken')
const MongoDBStore = require('connect-mongodb-session')(session);
mongoose.Promise = global.Promise

const mongoDBUri = 'mongodb+srv://PosterApp:A1s2f4g5%2A@poster-data.noemv.mongodb.net/Data'

mongoose.connect(mongoDBUri,
{   useNewUrlParser:true,
    useUnifiedTopology:true});

    mongoose.connection.once('open',function(){
        console.log('connection is success!! ');
    }).on('error', function(error){
        console.log('***connection not available***',error);
    });

const store = new MongoDBStore({
    uri: mongoDBUri,
    collection: 'database'
});
app.use(express.urlencoded({extended: true}));

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
        res.redirect('/')
    }
}

app.get('/homepage',isAuth , (req, res) => {
    res.sendFile(path.resolve(__dirname,'public/homepage/homepage.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'public/login/login.html'))
})

app.post('/', async (req, res) => {
    const { email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        return  res.redirect('/');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return  res.redirect('/');
    }

    req.session.isAuth = true
    res.redirect('/homepage');
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname,'public/register/register.html'))
})

app.post('/register', async (req, res) => {
    const {
        username,
        password,
        email,
        lastName,
        firstName
        } = req.body

    let user = await User.findOne({email})

    if (user) {
        return res.redirect('/register');
    }
 
    const hashedPass = await bcrypt.hash(password, 12);

    user = new User({
        username,
        password: hashedPass,
        email,
        lastName,
        firstName
    })
    await user.save();
    res.redirect('/')
});


app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


//body parser Midware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api',AuthRoute)
app.use('/static', express.static(path.join(__dirname, 'public')))
