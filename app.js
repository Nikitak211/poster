const express = require('express');
const path = require('path');
const register = require('./api/registerRouter');
const app = express();

//body parser Midware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(__dirname, 'public')))

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