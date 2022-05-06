console.log('FUNCIONA CART ');
console.log('LOCAL STORAGE: ',localStorage);
//localStorage.clear();
//SELECCIÒN DE ELEMENTOS
let items=document.querySelector('.right-container-content');
const costCalculation=document.querySelector('.costCalculation');
const subTotalCost=document.querySelector('#subTotalCost');
const deliveryCost=document.querySelector('#deliveryCost').textContent;
const totalCost=document.querySelector('#totalCost');
cartText= document.querySelector('.cartText');
cartTextContainer= document.querySelector('.cartTextContainer');
//Al hacer click en cancelar, limpia el local.storage y redirecciona al Home.
cancelButton= document.querySelector('#cancelCart');
cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('cancel');
    localStorage.clear();
    window.location.href = '/';
});
//INICIALIZACION DE VARIABLES
let deliveryCostNumber= Number(deliveryCost.replace('$', ''));
let subTotalFinal=0;
let delivery=deliveryCostNumber;
let finalCost=0 ;
let subTotalArray=[];
//FUNCION DE summar
var values1;
window.onload=getData();
function sumTotal(){
    sumSubTotal();
}
function sumSubTotal(){
    values1.forEach((value) => {
        subTotalArray.push(Number(value.price.replace('$', '')));
        return subTotalArray;
    })
    subTotalFinal=subTotalArray.reduce((acum,current)=>{
        return acum+current;
    },0);
    subTotalCost.innerText=`$ ${subTotalFinal}`;
    console.log('RESTA',subTotalCost);
}
if(localStorage.carrito>0){
    console.log('CART con carrito');
    cartTextContainer.style.display='block';
    carrito= localStorage.getItem('carrito');
    cartText.innerHTML = `Carrito (${carrito})`;
}
function getData() {
function allStorage() {
    console.log('PRODUCTOSS CART',localStorage.productos);
        values1= JSON.parse(localStorage.getItem('productos')) ;
        // localStorage.setItem('productos',values1)
        localStorage.setItem('productos', JSON.stringify(values1));
        return values1;
    }
        allStorage();
        populatingDOM();
        sumTotal();
        finalCost= subTotalFinal+deliveryCostNumber;
        totalCost.innerText= `$ ${finalCost}` ;
}
const deleteButtons= document.querySelectorAll('.productCartDelete');
//VALIDA SI NO HAY MÀS PRODUCTOS, REDIRECCIONA AL HOME
if(carrito.length > 0){
    deleteButtons.forEach((element) => {
        element.addEventListener('click',deleteProduct)
       })
}else{
    window.location.href = '/';
}
function deleteProduct(e){
    console.log('cliqueado')
    const productClicked= e.target;
    const productsInCart=productClicked.closest('.productsInCart');
    let priceToDelete= productsInCart.querySelector('.productPrice').textContent.trim();
    values1= values1.filter(value=>{
      return value.price!==priceToDelete;
    })
    console.log(":cohete: ~ file: cart.js ~ line 144 ~ deleteProduct ~ productsInCart", values1)
    // localStorage.removeItem(productsInCart);
    productsInCart.remove();
     localStorage.setItem('productos', JSON.stringify(values1));
    let numberToDelete= Number(priceToDelete.replace('$', ''));
    subTotalFinal-=numberToDelete;
    finalCost= subTotalFinal+deliveryCostNumber;
    totalCost.innerText=`$ ${finalCost}` ;
    subTotalCost.innerText=`$ ${subTotalFinal}`;
    console.log('RESTA',subTotalCost);
    carrito= localStorage.getItem('carrito');
    carrito--;
    localStorage.setItem('carrito',carrito)
    cartText.innerHTML = `Carrito (${carrito})`;
    //  values1= JSON.parse(localStorage.getItem('productos')) ;
    // // localStorage.setItem('productos',values1)
    //  localStorage.setItem('productos', JSON.stringify(values1));
     console.log('SALE LOCALSTORAGEEE',localStorage.productos);
    //VALIDA SI NO HAY MÀS PRODUCTOS REDIRECCIONA AL HOME
    if(carrito==0){
        window.location.href = '/';
    }
    }
//LLENA LA VISTA CON LOS DATOS DE LOS PRODUCTOS
 function populatingDOM(){
    values1.forEach(item => {
    productTitle=item.title;
    productPrice=item.price;
    productImage=item.image;
    printData(productTitle,productPrice,productImage);
    })
 };
//ESTRUCTURA LA VISTA CON LOS DATOS DE LOS PRODUCTOS Y ELEMENTOS DEL DOM
 function printData(productTitle,productPrice,productImage){
    let htmlElement=`
    <div class="productImage">
    <img src="/uploads/products/${productImage}" alt="">
    <!-- <h1>test</h1> -->
    </div>
    <div class="productDetail">
    <div class="leftDetail">
    <!---------------------- PRODUCT NAME ------------------------->
        <span class="productName">
        ${productTitle}
        </span>
    </div>
    <!---------------------- PRODUCT PRICE------------------------->
    <div class="rightDetail">
    <span class="productPrice">
    ${productPrice}
    </span>
    <!---------------------- PRODUCT DELETE ------------------------->
    <span class="productCartDelete">
        Quitar
    </span>
    <span>
    </span>
    </div>`;
    const itemContainer =document.createElement('section');
    itemContainer.className='productsInCart';
    items.insertBefore(itemContainer,costCalculation);
    itemContainer.innerHTML+=htmlElement;
}
