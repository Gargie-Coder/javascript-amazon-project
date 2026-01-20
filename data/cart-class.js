class Cart {
  CartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.CartItems = JSON.parse(
      localStorage.getItem(this.localStorageKey)
    );

    if (!this.CartItems) {
      this.CartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliverOptionId: "1"
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliverOptionId: "2"
        },
        {
          productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
          quantity: 1,
          deliverOptionId: "3"
        }
      ];
    }
  }

  SaveCartToLocalStorage() {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.CartItems)
    );
  }

  updateDeliveryOption(productId, newOptionId) {
    const item = this.CartItems.find(
      item => item.productId === productId
    );

    if (!item) return;

    item.deliverOptionId = newOptionId;
    this.SaveCartToLocalStorage();
  }

  updateCartQuantity(productId) {
    const selector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    if (!selector) return;

    const quantity =
      Number(selector.querySelector("select").value) || 1;

    const existing = this.CartItems.find(
      item => item.productId === productId
    );

    if (existing) {
      existing.quantity = quantity;
    } else {
      this.CartItems.push({
        productId,
        quantity,
        deliverOptionId: "1"
      });
    }

    this.SaveCartToLocalStorage();
  }

  removeFromCart(productId) {
    this.CartItems = this.CartItems.filter(
      item => item.productId !== productId
    );
    this.SaveCartToLocalStorage();
  }

  updateQuantity(productId, newQuantity) {
    const item = this.CartItems.find(
      item => item.productId === productId
    );

    if (!item) return;

    item.quantity = Number(newQuantity) || 0;
    this.SaveCartToLocalStorage();
  }

  updateHeaderCartQuantity() {
    const cartQuantity = this.CartItems.reduce(
      (total, item) => total + (Number(item.quantity) || 0),
      0
    );

    const header = document.querySelector(".js-cart-quantity");
    if (header) header.textContent = cartQuantity;

    const checkoutHeader = document.querySelector(
      ".js-checkout-header-middle-section"
    );
    if (checkoutHeader) {
      checkoutHeader.textContent = `Checkout (${cartQuantity} items)`;
    }
  }
}

const cart = new Cart("cart-local-storage-key");
const businesscart = new Cart("business-cart-local-storage-key");

console.log(cart);
console.log(businesscart);
console.log(businesscart instanceof Cart);

export default Cart;
