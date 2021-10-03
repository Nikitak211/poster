const express = require('express');
const path = require('path');
const register = require('./api/registerRouter');
const app = express();
const mongoose = require('mongoose');
const AuthRoute = require('./routes/auth')
mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://PosterApp:A1s2f4g5%2A@poster-data.noemv.mongodb.net/Data',
{   useNewUrlParser:true,
    useUnifiedTopology:true});

    mongoose.connection.once('open',function(){
        console.log('connection is success!! ');
    }).on('error', function(error){
        console.log('***connection not available***',error);
    });



app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'public/homepage/homepage.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname,'public/login/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname,'public/register/register.html'))
})

app.get('/api', register)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


//body parser Midware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api',AuthRoute)
app.use('/static', express.static(path.join(__dirname, 'public')))
