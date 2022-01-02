const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath));
app.set('view engine', 'ejs')

app.listen(4000, () => {
    console.log('Servidor corriendo en puerto 4000')
})

const mainRouter = require('./routes/mainRouter.js')
const usersRouter = require('./routes/usersRouter.js')
const productsRouter = require ('./routes/productsRouter.js')

app.use('/', mainRouter);

app.use('/user', usersRouter);

app.use('/products', productsRouter);


