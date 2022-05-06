console.log('FUNCIONA PRODUCT CART');
//localStorage.clear();
//SELECCIONO ELEMENTOS DEL DOM
let article= document.querySelectorAll('.add-To-Cart-Container');
let cartText= document.querySelector('.cartText');
let cartTextContainer= document.querySelector('.cartTextContainer');
//INICIALIZO VARIABLES
let productsArray;
let carrito;
//LIMPIA EL LOCALSTORAGE AL HACER LOGOUT
let logOutText= document.querySelector('.logOutText');
if(logOutText){
logOutText.addEventListener('click', () => localStorage.clear());
}
//EVALUA SI EL CARRITO YA VIENE CON PRODUCTOS
if(localStorage.carrito>0){
    console.log('con carrito');
    productsArray= JSON.parse(localStorage.getItem('productos'));
    console.log('PRODUCTO ARRAY',productsArray);
    carrito= localStorage.getItem('carrito');
    cartTextContainer.style.display='block';
    cartText.style.display='block';
    cartText.innerHTML = `Carrito (${carrito})`;
    localStorage.setItem('carrito',carrito)
}else{
    console.log('sin carrito');
    productsArray=[];
    cartTextContainer.style.display='none';
    cartText.style.display='none';
    carrito=0;
    localStorage.setItem('carrito',carrito)
}
article.forEach((element) => {
  element.addEventListener("click", addToCartClicked);
  console.log('CLIQUEADO');
});
function addToCartClicked(e){
    console.log('cliqueado')
    console.log('ENTRA  LOCALSTORAGEEE',localStorage);
    cartTextContainer.style.display='block';
    cartText.style.display='block';
    const productClicked= e.target;
    carrito= localStorage.getItem('carrito');
    carrito++;
    localStorage.setItem('carrito',carrito)
    cartText.innerHTML = `Carrito (${carrito})`;
    console.log('cliqueado con carrito',carrito);
    const product=productClicked.closest('.product2');
    const productTitle= product.querySelector('.product-name').textContent.trim();
    const productPrice= product.querySelector('.product-price').textContent.trim();
    const productImage= product.querySelector('.img-container img').src.trim().slice(39,);
    productAdded={
        title:productTitle,
        price:productPrice,
        image:productImage
    }
    productsArray.push(productAdded);
     localStorage.setItem('productos', JSON.stringify(productsArray));
     console.log('PRODUCTOSS PRODUCTCART',localStorage.productos);
}