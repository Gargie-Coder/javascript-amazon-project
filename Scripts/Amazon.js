/**
 * SHOPPING CART SCRIPT
 * ---------------------
 * Flow of this file:
 * 
 * 1. Import data (products, cart).
 * 2. Render products into the grid dynamically.
 * 3. Handle cart updates when a product is added:
 *    - Update quantity in the cart.
 *    - Update total cart quantity in header.
 * 4. Show "Added to Cart" confirmation message.
 * 5. Add event listeners to buttons.
 */

// 1. Import cart and product data
import { Cart } from "../data/cart.js";
import { products } from "../data/products.js";

// 2. Build the HTML for the products grid
let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      
      <!-- Product image -->
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <!-- Product name -->
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <!-- Product rating (stars + count) -->
      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <!-- Product price -->
      <div class="product-price">
        $${product.priceCents / 100}
      </div>

      <!-- Quantity selector -->
      <div class="product-quantity-container js-quantity-selector-${product.id}">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <!-- "Added to cart" confirmation message -->
      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <!-- Add to cart button -->
      <button 
        class="add-to-cart-button button-primary js-add-to-cart" 
        data-product-id="${product.id}">
        Add to Cart
      </button>

    </div>
  `;
});

/**
 * 3a. Update the cart when a product is added or quantity is changed
 * @param {string} productId - ID of the product being updated
 */
function updateCartQuantity(productId) {
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

  // Update total cart quantity in header
  const cartQuantity = Cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".js-cart-quantity").textContent = cartQuantity;
}

/**
 * 4. Show the "Added to Cart" confirmation message for 2 seconds
 * @param {string} productId - ID of the product added
 */
function showAddedToCartMessage(productId) {
  const addedToCartSelector = document.querySelector(
    `.js-added-to-cart-${productId}`
  );

  // Show the "Added" message
  addedToCartSelector.classList.add("added-to-cart-visible");

  // Clear old timeout if exists, then set new one
  clearTimeout(addedToCartSelector.timeoutId);
  addedToCartSelector.timeoutId = setTimeout(() => {
    addedToCartSelector.classList.remove("added-to-cart-visible");
  }, 2000);
}

// 5. Insert generated products into the DOM
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// 5. Add event listeners to "Add to Cart" buttons
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    
    // Update cart and show confirmation message
    updateCartQuantity(productId);
    showAddedToCartMessage(productId);
  });
});
