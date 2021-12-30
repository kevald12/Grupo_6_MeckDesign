const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath));
app.set('view engine', 'ejs')

app.listen(4000, () => {
    console.log('Servidor corriendo en puerto 4000')
})
app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/productDetail', (req, res) => {
    res.render('./products/productDetail.ejs')
});

app.get('/productCart', (req, res) => {
    res.render('./products/productCart.ejs')
});
app.get('/products', (req, res) => {
    res.render('./products/products.ejs')
});

app.get('/register', (req, res) => {
    res.render('./users/register.ejs')
});

app.get('/login', (req, res) => {
    res.render('./users/login.ejs')
});

app.get('/productsCreate', (req, res) => {
    res.render('./products/productsCreate.ejs')
});

