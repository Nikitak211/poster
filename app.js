const express = require('express');
const path = require('path');
const register = require('./api/register');
const app = express();

//body parser Midware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static/login', express.static(path.join(__dirname, 'login')))
app.use('/static/register', express.static(path.join(__dirname, 'register')))
app.use('/static/users', express.static(path.join(__dirname, 'homepage')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'login/login.html'))
})
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname,'register/register.html'))
})
app.get('/api', register)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));