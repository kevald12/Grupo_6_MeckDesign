const {Product, Cart, User} = require('../database/models');

const cartController = {
    add:  async (req, res)=>{
    //1. Capture all variables needed
        let cartId = req.session.cartId //cartId in database - number || undefined if not created yet
        const cart = await Cart.findByPk(cartId, {include: "product"}) //object || undefined
        const user = req.session.userLogged // string - will not show if user not logged due to middleware
        const product = await Product.findByPk(req.params.id) // object 
    //2. Create object to push into cart in DB
        const productToCart = {
            userId: user.userId,
            product: product
        }
        console.log("BEFORE IF", req.session.cartId)
    //3. Create cart or push into existing one
        //3.1 Check if there is a cart already
        if(req.session.cartCreated){ //cart created in next step
            //3.1.2 if cart already, adds product to existing cart
            cart.addProduct(product) 
        console.log("INSIDE IF", req.session.cartId)
         } else { 
        //3.2 When cart is undefined
            //3.2.1 creates cart using express- pushes object into DB
            const createCart = await Cart.create(productToCart)
            //3.2.2 adds product to existing cart
            createCart.addProduct(product)
        //3.3 Sets cartId session using # of cartId created in database
            req.session.cartId = createCart.cartId 
            console.log("LLEGUE AL ELSE")
        }      
        console.log("OUTSIDE IF", req.session.cartId)
    //4. redirect to new route to show the cart was created successfully
        res.redirect('/products/cartCreated')   
    },

    cartCreated: function(req, res){
        //Redirects to cart rendered in productsController
        res.redirect("/products/cart")
        console.log("LA SESSION EN EL GET", req.session.cartId)
    }
}

module.exports = cartController;