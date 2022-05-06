window.addEventListener("load", function (e) {
//Elements from productDetail
    const addCartButton = document.querySelector("#addCartButton");
    const idProduct = window.location.href.split('/').pop()
    const productImage = document.querySelector("#productImage");
    const productName = document.querySelector("#productName");
    const price = document.querySelector("#productPrice");
    const qty = document.querySelector("#qty-select");
//Creates the object to store the selected product info setting the values to correct dataType
const productPrice = Number(price.innerText.replace('$', ''))
let qtySelect = Number(qty.value)
const currentProduct = {
        id: idProduct,
        title: productName.innerText,
        image: productImage.currentSrc,
        price: productPrice,
        qty: qtySelect,
        totalPrice: 0 //this will be set once the qty is selected
    }
//Updates the qty in currentProduct each time the select changes
    qty.addEventListener("change", () => {
        currentProduct.qty = Number(qty.value)
        qtySelect = Number(qty.value)
        console.log("qtySelect", qtySelect)
    })
//Una funcion para el total
function oneProductPriceTotal(price, qty, totalPriceInProduct){
    totalPriceInProduct = price * qty
    return totalPriceInProduct
}
//Creates the first object to push into localStorage
    let firstProduct = {}
    firstProduct[idProduct] = currentProduct

    addCartButton.addEventListener("click", (e) => {
        if (localStorage.length == 0) {
            //first set totalPrice with qty selected before pushing to localStorage
            firstProduct[idProduct].totalPrice = oneProductPriceTotal(firstProduct[idProduct].price, firstProduct[idProduct].qty, firstProduct[idProduct].totalPrice)
            //Creates the cart if localStorage is empty
            localStorage.setItem("productsInCart", JSON.stringify(firstProduct))
        } else {
            //Turns the localStorage into object
            let productsCart = JSON.parse(localStorage.getItem("productsInCart"))
            //check if product is already on storage
            if (productsCart[idProduct] != undefined) {
            //when the product is already in the object sums the qty
                productsCart[idProduct].qty += Number(qty.value)
            } else {
            //adds the product to the object
                productsCart[idProduct] = currentProduct
            }
            //calls function to set totalProduct with new qty
            productsCart[idProduct].totalPrice = oneProductPriceTotal(firstProduct[idProduct].price, firstProduct[idProduct].qty, firstProduct[idProduct].totalPrice)
            //Sets the localStorage with previous products and new ones
            localStorage.setItem("productsInCart", JSON.stringify(productsCart))
        }
        //alert to inform quantity added and to redirect to cart or keep shopping
        let confirmation = confirm(`You added ${Number(qty.value)} ${currentProduct.title} to your cart.
        Would you like to go to your shopping cart?`)
        if (confirmation){
            window.location.href ='http://localhost:4000/products/cart'
        }
    })



})