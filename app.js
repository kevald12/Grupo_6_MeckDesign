const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath))

app.listen(4000, () => {
    console.log('Servidor corriendo en puerto 4000')
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
});

app.get('/footer', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/indexFooter.html'))
});

app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html'))
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'))
});