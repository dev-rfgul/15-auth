const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const userModel = require('./models/user');
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/create', async (req, res) => {
    let { username, email, password, confirmPassword } = req.body;



    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        // confirmPassword: confirmPassword // Usually not stored
    });

    let token = jwt.sign({ email }, "heloworld")
    res.cookie('token',token);
    res.send(createdUser);



});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
