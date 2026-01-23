// data/cart.js
export let Cart;
loadFromStorage();
 export function loadFromStorage() {
  Cart = JSON.parse(localStorage.getItem('Cart'));
  if(!Cart)
  Cart =  [
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
}
export function updatedeliveryoption(productid,new_optionid){
  let matchingProduct;
  Cart.forEach(element => {
    if(element.productId === productid){
      matchingProduct = element;
    }
  });
  matchingProduct.deliverOptionId=new_optionid;
  SaveCartToLocalStorage();
}

export function SaveCartToLocalStorage() {
  localStorage.setItem('Cart', JSON.stringify(Cart));
}

/**
 * Update quantity from the product page selector when "Add to Cart" is clicked.
 * If product exists update its quantity, otherwise push new item.
 * (productId is a string)
 */
export function updateCartQuantity(productId) {
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  
  if (!quantitySelector) return;

  const quantity = Number(quantitySelector.querySelector('select').value) || 1;

  // .find logic use kar rahe hain jaisa dusre code mein tha
  const existing = Cart.find(item => item.productId === productId);

  if (existing) {
    // Exact wording: quantity update logic
    existing.quantity = quantity;
  } else {
    // New item push logic
    Cart.push({ productId, quantity, deliverOptionId: "1" });
  }

  SaveCartToLocalStorage();
}

/**
 * Remove product from cart entirely
 */
export function removeFromCart(productId) {
  Cart = Cart.filter(item => item.productId !== productId);
  SaveCartToLocalStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
   console.log(xhr.response);
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

/**
 * Update quantity for an item already in cart (used on checkout)
 */

export function updateQuantity(productId, new_quantity) {
  const item = Cart.find(i => i.productId === productId);
  if (item) {
    item.quantity = Number(new_quantity) || 0;
  }
  SaveCartToLocalStorage();
}

/**
 * Single source-of-truth function to update visible header counts.
 * Updates both header badge (.js-cart-quantity) and checkout header (.js-checkout-header-middle-section) if present.
 */
export function updateHeaderCartQuantity() {
  const cartQuantity = Cart.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);

  const headerQuantity = document.querySelector('.js-cart-quantity');
  if (headerQuantity) headerQuantity.textContent = cartQuantity;

  const checkoutHeader = document.querySelector('.js-checkout-header-middle-section');
  if (checkoutHeader) checkoutHeader.textContent = `Checkout (${cartQuantity} items)`;

  SaveCartToLocalStorage();
}
