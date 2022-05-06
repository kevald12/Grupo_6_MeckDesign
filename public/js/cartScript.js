window.addEventListener("load", function (e) {
    //++++++++++++++++++++++++++++++++FALTA pasar localStorage a userCart cuando se loguea
    //Una vista que se muestre al presionar Checkout que ofrezca loguearse o registrarse para una mejor experiencia
    //Que cuando se completa la compra se vacie el carrito
//1. Fetch the localStorage data into a variable
    let productsInLocalStorage = JSON.parse(localStorage.getItem('productsInCart'));
//3. Catch the main tags to insert the HTML into
    let articleDiv = document.querySelector('#cart-article');
    let cartDiv = document.querySelector('#cartDiv');
    let clearEmptyLocalStorage = function (itemInLocalStorage) {
        if(localStorage[itemInLocalStorage] == "{}"){
            localStorage.clear()
            console.log("me ejecute")
        }
    }
//4. Default message in case of empty localStorage or all items removed from it
    if ((localStorage.length <= 0)) {
        let h5Tag = document.createElement("h5");
        let noProductsInCart = `There are no products in your shopping cart`
        cartDiv.appendChild(h5Tag);
        h5Tag.innerHTML += noProductsInCart;
        console.log('cart vacio');
//5. Functionality in case of populated localStorage
    }else{
//6. =====OUTPUT OF TOTALS AND BUTTONS =====
    //6.1. Catch tags and generate HTML to output data for totals, shipping and buttons on DOM
          let costSection = document.querySelector('#cost-section');
          let costsAndCleanCart = `
      <button id="clearLocalStorage" class="checkout-button">Empty Shopping Bag</button><p id="subtotal" class="description-product">Subtotal: $1</p><p id="shipping" class="description-product">Shipping: $30</p><p id="total" class="description-product total-cart">Total Cart 70$</p><div class="cart-buttons"><input type="submit" value="Checkout " class="checkout-button"></div>`;
          let costDiv = document.createElement('div');
          costDiv.className = "final-price-cart";
          costSection.appendChild(costDiv);
          costDiv.innerHTML += costsAndCleanCart;
    //6.2. Get clear button working
          let clearLocalStorage = document.querySelector('#clearLocalStorage');
          clearLocalStorage.addEventListener('click', (e) => {
              let cleanCart = confirm("Are you sure you want to clean your shopping cart?");
              if (cleanCart) {
                  localStorage.clear();
                  window.location.reload();
              }
          })
//7.=======SETTING TOTALS ON WINDOW LOAD
    //7.1 Catch the tags from HTML
        let subtotal = document.querySelector('#subtotal');
        let shipping = document.querySelector('#shipping');
        let total = document.querySelector('#total');
    //7.2 Catch the number value to use in functions
        let subtotalValue = Number(subtotal.innerText.replace("Subtotal: $", ""));
        let shippingValue = Number(shipping.innerText.replace("Shipping: $", ""));
    //7.3 Declare the functions to get subtotal and total
        const getSubtotal = function (object) {
            let productsArray = Object.entries(object);
            let reduce = productsArray.reduce((subTotal, product) => {
                let productTotalPrice = product[1].totalPrice;
                subTotal += productTotalPrice;
                return subTotal;
            }, 0);
            return reduce;
        };
        const getTotal = function (subTotal, shipping) {
            let grandTotal = subTotal + shipping;
            return grandTotal;
        };
    //7.4 This function sets the total price of the product to pass to the productObject
        function oneProductPriceTotal(price, qty, totalPriceInProduct) {
            totalPriceInProduct = price * qty;
            return totalPriceInProduct;
        };
//=====OUTPUT ITEMS FROM LOCAL STORAGE====
    //8 Iterate localStorage to show 1 article node per item
        for (let productKey in productsInLocalStorage) {
    //8.1 Catch tags and generate HTML to output product data on DOM
            let oneProductPrice = productsInLocalStorage[productKey].price;
            let oneProductId = productsInLocalStorage[productKey].id;
            let oneProductQty = productsInLocalStorage[productKey].qty;
            let productAdded = `<div><img id="cart-image" src="${productsInLocalStorage[productKey].image}"  class="image-cart"></div><div class="product-cart"><div class="product-cart-info"><h2 class="product-title-cart" id="cart-title">${productsInLocalStorage[productKey].title}</h2><p class="price-cart" id="cart-price">$${oneProductPrice}</p><form action="" method="post"><div><input type="number" min="1" step="1" id="qty-input${oneProductId}" value="${oneProductQty}"/></div></div><div><ul class="cart-buttons"><li><a id="remove${oneProductId}" href="#">Remove from cart</a></li><i class="fas fa-heart"></i></ul></div></div>`;
    //8.1.1 Create DOM element in which to output the product data
            let productArticle = document.createElement('article');
            productArticle.className = "item-cart";
            articleDiv.appendChild(productArticle);
            productArticle.innerHTML += productAdded;
//9====== Qty modification for each product
    //9.1 Catch the qty input inside the iteration and give event
            let qtyInput = document.querySelector(`#qty-input${oneProductId}`);
            qtyInput.addEventListener("change", () => {
        //9.1.1 first set new qty value for product
                productsInLocalStorage[productKey].qty = Number(qtyInput.value);
        //9.1.2 then set new totalPrice with new qty calling the function from 7.4
                productsInLocalStorage[productKey].totalPrice = oneProductPriceTotal(productsInLocalStorage[productKey].price, productsInLocalStorage[productKey].qty, productsInLocalStorage[productKey].totalPrice);
        //9.2 update localStorage
                localStorage.setItem("productsInCart", JSON.stringify(productsInLocalStorage));
        //9.2.1 catch localStorage on new variable
                let newLocal = JSON.parse(localStorage.getItem('productsInCart'));
        //9.2.3 use new variable to update subtotal
                subtotal.innerText = `Subtotal: $${getSubtotal(newLocal)}`;
        //9.2.4 update subtotalValue for totalPice on qtyChange
                subtotalValue =  Number(subtotal.innerText.replace("Subtotal: $", ""));
        //9.2.5 Set total in DOM calling the function from 7.3
                total.innerText = `Total: $${getTotal(subtotalValue, shippingValue)}`;
            });
    //10 Remove one item
            let removeOneItem = document.querySelector(`#remove${oneProductId}`);
            removeOneItem.addEventListener("click", ()=>{
                //10.1 catch localStorage in new variable and delete item
                let removeFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart'));
                delete removeFromLocalStorage[oneProductId];
                //10.2 Set localStorage again
                localStorage.setItem("productsInCart", JSON.stringify(removeFromLocalStorage));
                clearEmptyLocalStorage("productsInCart")
                window.location.reload();
            });
        };
        console.log("local storage", JSON.parse(localStorage.getItem('productsInCart')))
//11. =====TOTALS DATA ON WINDOW LOAD
        subtotal.innerText = `Subtotal: $${getSubtotal(productsInLocalStorage)}`;
        subtotalValue =  Number(subtotal.innerText.replace("Subtotal: $", ""));
        total.innerText = `Total: $${getTotal(Number(subtotalValue), Number(shippingValue))}`;
    };
});