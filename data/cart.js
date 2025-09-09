export let Cart=JSON.parse(localStorage.getItem('Cart')) 
||[
   
];


export function SaveCartToLocalStorage(){
  localStorage.setItem('Cart',JSON.stringify(Cart));
}
export function updateCartQuantity(productId) {
  // Get the quantity selected for this product
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.querySelector("select").value);

  // Check if product already exists in the cart
  let matchingItem = Cart.find((item) => item.productId === productId);

  if (matchingItem) {
    // Update quantity if product already in cart
    matchingItem.quantity = quantity;
  } else {
    // Add new product to cart
    Cart.push({ productId, quantity });
  }

  SaveCartToLocalStorage();
}
export function removeFromCart(productId) {
  const newCart=[];
  Cart.forEach(element => {
    if(element.productId!==productId){
      newCart.push(element);
  }
  });
  Cart=newCart;
  console.log(Cart);
  SaveCartToLocalStorage();
}