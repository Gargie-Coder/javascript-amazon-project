/**
 * SHOPPING CART SCRIPT
 */

import { updateCartQuantity, updateHeaderCartQuantity } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";

// Load products first, then render
loadProducts(renderProductsGrid);

function renderProductsGrid() {
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
            ${Array.from({ length: 10 }, (_, i) => 
              `<option value="${i + 1}">${i + 1}</option>`
            ).join("")}
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

  const grid = document.querySelector(".js-products-grid");
  grid.innerHTML = productsHTML;

  attachAddToCartEvents();
}

// Add to cart click handler
function attachAddToCartEvents() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      updateCartQuantity(productId);
      updateHeaderCartQuantity();
      showAddedToCartMessage(productId);
    });
  });
}

// Added to cart UI animation
function showAddedToCartMessage(productId) {
  const el = document.querySelector(`.js-added-to-cart-${productId}`);
  if (!el) return;

  el.classList.add("added-to-cart-visible");

  clearTimeout(el.timeoutId);

  el.timeoutId = setTimeout(() => {
    el.classList.remove("added-to-cart-visible");
  }, 2000);
}

// Initial cart header update
updateHeaderCartQuantity();
