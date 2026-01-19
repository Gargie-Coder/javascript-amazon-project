function Cart(localStorageKey) {

const cart = {
 loadFromStorage() {
  this.CartItems = JSON.parse(localStorage.getItem(localStorageKey));
  if(!this.CartItems)
  this.CartItems =  [
  {productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
    quantity:1,
    deliverOptionId:"1"
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliverOptionId:"2"
  },
  {
    productId:"54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity:1,
    deliverOptionId:"3"
  }
];
},

   updatedeliveryoption(productid,new_optionid){
  let matchingProduct;
  this.CartItems.forEach(element => {
    if(element.productId === productid){
      matchingProduct = element;
    }
  });
  matchingProduct.deliverOptionId=new_optionid;
  this.SaveCartToLocalStorage();
},

 SaveCartToLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(this.CartItems));
},

/**
 * Update quantity from the product page selector when "Add to Cart" is clicked.
 * If product exists update its quantity, otherwise push new item.
 * (productId is a string)
 */
 updateCartQuantity(productId) {
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  
  if (!quantitySelector) return;

  const quantity = Number(quantitySelector.querySelector('select').value) || 1;

  // .find logic use kar rahe hain jaisa dusre code mein tha
  const existing = this.CartItems.find(item => item.productId === productId);

  if (existing) {
    // Exact wording: quantity update logic
    existing.quantity = quantity;
  } else {
    // New item push logic
    this.CartItems.push({ productId, quantity, deliverOptionId: "1" });
  }

  this.SaveCartToLocalStorage();
},

/**
 * Remove product from cart entirely
 */
 removeFromCart(productId) {
  this.CartItems = this.CartItems.filter(item => item.productId !== productId);
  this.SaveCartToLocalStorage();
},

/**
 * Update quantity for an item already in cart (used on checkout)
 */
 updateQuantity(productId, new_quantity) {
  const item = this.CartItems.find(i => i.productId === productId);
  if (item) {
    item.quantity = Number(new_quantity) || 0;
  }
  this.SaveCartToLocalStorage();
}
,
/**
 * Single source-of-truth function to update visible header counts.
 * Updates both header badge (.js-cart-quantity) and checkout header (.js-checkout-header-middle-section) if present.
 */
 updateHeaderCartQuantity() {
  const cartQuantity = cart.CartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);

  const headerQuantity = document.querySelector('.js-cart-quantity');
  if (headerQuantity) headerQuantity.textContent = cartQuantity;

  const checkoutHeader = document.querySelector('.js-checkout-header-middle-section');
  if (checkoutHeader) checkoutHeader.textContent = `Checkout (${cartQuantity} items)`;

  SaveCartToLocalStorage();
}};
return cart;
}

  const cart = Cart('cart-oop');
  const businesscart = Cart('business-cart');

cart.loadFromStorage();
businesscart.loadFromStorage();
console.log(cart);
console.log(businesscart);
export default cart;


