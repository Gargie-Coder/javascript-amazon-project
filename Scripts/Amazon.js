/**
 * SHOPPING CART SCRIPT
 * ---------------------
 * Flow of this file:
 * 
 * 1. Import data (products, cart).
 * 2. Render products into the grid dynamically.
 * 3. Handle cart updates when a product is added:
 *    - Update quantity in the cart (handled in cart.js).
 *    - Update total cart quantity in header.
 * 4. Show "Added to Cart" confirmation message.
 * 5. Add event listeners to buttons.
 *
 * Note:
 * - The function updateCartQuantity() is now imported from cart.js
 *   to keep cart logic separate from UI rendering.
 */

// 1. Import cart and product data

// scripts/products.js
import { Cart, updateCartQuantity, SaveCartToLocalStorage, updateHeaderCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
       ${product.getPrice()}
      </div>
    ${product.extraInfo()}

      <div class="product-quantity-container js-quantity-selector-${product.id}">
        <select>
          ${Array.from({ length: 10 }, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png"> Added
      </div>

      <button 
        class="add-to-cart-button button-primary js-add-to-cart" 
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

function showAddedToCartMessage(productId) {
  const el = document.querySelector(`.js-added-to-cart-${productId}`);
  if (!el) return;
  el.classList.add("added-to-cart-visible");
  clearTimeout(el.timeoutId);
  el.timeoutId = setTimeout(() => el.classList.remove("added-to-cart-visible"), 2000);
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    updateCartQuantity(productId);        // update Cart array + localStorage
    updateHeaderCartQuantity();           // update header UI (single source)
    showAddedToCartMessage(productId);
  });
});

// initial header update
updateHeaderCartQuantity();
