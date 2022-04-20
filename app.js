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
//Global Middlewares 
const autoLogin = require("./middlewares/autoLoginMiddleware");
const userLogged = require("./middlewares/userLoggedMiddleware");
const isUserAdmin = require("./middlewares/adminMiddleware")

// api users
const apiRouterUsers = require('./routes/api/apiUsers')
app.use('/api/users',apiRouterUsers)

// api products
const apiRouterProducts = require('./routes/api/apiProducts')
app.use('/api/products',apiRouterProducts)

app.use(session({
    secret: 'ok',
    resave: 'false', 
    saveUninitialized: 'false',
}));

app.use(autoLogin);

app.use(userLogged);

app.use(isUserAdmin);

app.use('/', mainRouter);

app.use('/user', usersRouter);

app.use('/products', productsRouter);



