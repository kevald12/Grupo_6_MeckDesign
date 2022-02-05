const express = require('express');
const app = express();
const session = require('express-session');
const cookie = require('cookie-parser');

const methodOverride = require('method-override')
app.use (methodOverride('_method'))

const path = require('path');
const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath));
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(cookie());

app.listen(4000, () => {
    console.log('Servidor corriendo en puerto 4000')
})

const mainRouter = require('./routes/mainRouter.js')
const usersRouter = require('./routes/usersRouter.js')
const productsRouter = require ('./routes/productsRouter.js')
const autoLogin = require("./middlewares/autoLoginMiddleware");
const userLogged = require("./middlewares/userLoggedMiddleware");


app.use(session({
    secret: 'ok',
    resave: 'false', 
    saveUninitialized: 'false',
}));

app.use(autoLogin);

app.use(userLogged);

app.use('/', mainRouter);

app.use('/user', usersRouter);

app.use('/products', productsRouter);



