const express = require('express');
const app = express();
const session = require('express-session')

const methodOverride = require('method-override')
app.use (methodOverride('_method'))

const path = require('path');
const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath));
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.listen(4000, () => {
    console.log('Servidor corriendo en puerto 4000')
})

const mainRouter = require('./routes/mainRouter.js')
const usersRouter = require('./routes/usersRouter.js')
const productsRouter = require ('./routes/productsRouter.js')

app.use(session({
    secret: 'ok',
    resave: 'false', 
    saveUninitialized: 'false',
}));

app.use('/', mainRouter);

app.use('/user', usersRouter);

app.use('/products', productsRouter);



