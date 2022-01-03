const products = [
    { 
        name: 'Product 1',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 10,
        img: '/img/products/1-1.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
    {
        name: 'Product 2',
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 20,
        img:'/img/products/1-2.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined
    },
    { 
        name: 'Product 3',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 30,
        img: '/img/products/1-3.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
    { 
        name: 'Product 4',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 40,
        img: '/img/products/1-4.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
    { 
        name: 'Product 5',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 50,
        img: '/img/products/1-5.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
    { 
        name: 'Product 6',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 60,
        img: '/img/products/1-6.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
    { 
        name: 'Product 7',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 70,
        img: '/img/products/1-7.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
    { 
        name: 'Product 8',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 80,
        img: '/img/products/1-8.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
    { 
        name: 'Product 9',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 90,
        img: '/img/products/1-9.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
    { 
        name: 'Product 10',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 100,
        img: '/img/products/1-10.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
    { 
        name: 'Product 11',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 110,
        img: '/img/products/1-11.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
    { 
        name: 'Product 12',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        price: 120,
        img: '/img/products/1-12.jpg',
        categoriesRoom: undefined,
        categoriesTexture: undefined

    },
]
const controller = {
    mainRouter: (req, res) => {
        return res.render('index.ejs')
    },
    productsDetail: (req, res) => {
       return res.render('./products/productDetail.ejs')
    },
    productsCart: (req, res) => {
        return res.render('./products/productCart.ejs')
    },
    products: (req, res) => {
        return res.render('./products/products.ejs', {products: products})
    },
    productsCreate:  (req, res) => {
       return res.render('./products/productsCreate.ejs')
    },
    productsEdit: (req,res) => {
        return res.render ('./products/productsEdit.ejs')
    }
}

module.exports = controller;