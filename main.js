const btnCart=document.querySelector("#cart-icon");
const cart=document.querySelector(".cart");
const btnClose=document.querySelector("#cart-close");
console.log(btnCart,cart,btnClose);

btnCart.addEventListener("click",function(){
    cart.classList.add("cart-active")
})


btnClose.addEventListener("click",function(){
    cart.classList.remove("cart-active")
})


//Remove Cart Item

function loadContent(){

  
  let btnRemove=document.querySelectorAll(".cart-remove");
console.log(btnRemove);
btnRemove.forEach((btn)=>{
  btn.addEventListener("click",removeItem)
})


//Change Quantity

let qtyElement=document.querySelectorAll(".cart-quantity");
console.log(qtyElement);
qtyElement.forEach((input)=>{
  input.addEventListener("change",chgQuantity)
})
updateTotal()
}

function chgQuantity(){
  if(isNaN(this.value) || this.value<1){
       this.value=1
  }
  loadContent()
}


function removeItem(){
  console.log("click");
  if(confirm("Do You want to delete?")){
    let title=this.parentElement.querySelector(".cart-food-title").innerHTML;
    itemList=itemList.filter(e=> e.title!=title);
    this.parentElement.remove();
    loadContent()
  }
}


let cartBtns=document.querySelectorAll(".add-cart");
console.log(cartBtns);

cartBtns.forEach(function(btn){
btn.addEventListener('click',addCart)
})
let itemList=[]
function addCart(){
    let food=this.parentElement;
    // console.log(food);

   let title= food.querySelector('.food-title').innerHTML;
   let price=food.querySelector(".food-price").innerHTML;
   let imgSrc=food.querySelector(".food-img").src;
   console.log(title,price,imgSrc);

  let newProduct={title,price,imgSrc}
if(itemList.find((el)=>el.title==newProduct.title)){
    alert("product already added");
    return;
    }

else{
  itemList.push(newProduct)
}
   
let newProductElement=createCartProduct(title,price,imgSrc)

let element=document.createElement("div");
element.innerHTML= newProductElement;
let cartBasket=document.querySelector(".cart-content");
cartBasket.append(element)
loadContent();
function createCartProduct(title,price,imgSrc){

   return ` <div class="cart-box">
   <img src="${imgSrc}" class="cart-img">
   <div class="detail-box">
     <div class="cart-food-title">${title}</div>
     <div class="price-box">
       <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
    </div>
     <input type="number" value="1" class="cart-quantity">
   </div>
   <ion-icon name="trash" class="cart-remove"></ion-icon>
 </div> ` ;
}

}

function updateTotal(){
let cartItems=document.querySelectorAll(".cart-box");
let totalValue=document.querySelector(".total-price")
let total=0;
cartItems.forEach(product=>{
  let priceElement=product.querySelector(".cart-price");
  let price=parseInt(priceElement.innerHTML.replace("Rs.",""));
  let qty=product.querySelector(".cart-quantity").value;

  total=total+(price*qty)
  console.log(priceElement);

  product.querySelector(".cart-amt").innerHTML="RS." + (price*qty)
})
totalValue.innerHTML="RS." + total
}