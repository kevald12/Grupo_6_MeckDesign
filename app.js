const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath));

<<<<<<< HEAD
app.listen(4000, () => {
    console.log('Servidor corriendo en puerto 4000')
})
=======
app.listen(4000, () =>  console.log('Servidor corriendo en puerto 4000') )

>>>>>>> 5aa331dc7441528418f707de267d099eac252cae
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
});

<<<<<<< HEAD
app.get('/footer', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/indexFooter.html'))
});

app.get('/product', (req, res) => {
=======
app.get('/productDetail', (req, res) => {
>>>>>>> 5aa331dc7441528418f707de267d099eac252cae
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
});

app.get('/productCart', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html'))
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'))
});
