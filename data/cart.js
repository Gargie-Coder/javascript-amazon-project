export let Cart=[
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2},
  {
     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1},
  
];
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

  
}
export function removeFromCart(productId) {
  const newCart=[];
  Cart.forEach(element => {
    if(element.productId===productId){
      newCart.push(element);
  }
  });
  Cart=newCart;
  console.log(Cart);
}