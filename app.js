const express = require('express');
const path = require('path');
const register = require('./api/registerRouter');
const app = express();

//body parser Midware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static/login', express.static(path.join(__dirname, 'login')))
app.use('/static/register', express.static(path.join(__dirname, 'register')))
app.use('/static/homepage', express.static(path.join(__dirname, 'homepage')))
app.use('/static/svg', express.static(path.join(__dirname, 'svg')))
app.use('/static/logo', express.static(path.join(__dirname, 'logo')))


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'homepage/homepage.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname,'login/login.html'))
})
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname,'register/register.html'))
})
app.get('/api', register)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));