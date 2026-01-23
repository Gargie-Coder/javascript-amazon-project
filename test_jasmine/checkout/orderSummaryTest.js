import { renderOrderSummary } from '../../Scripts/checkout/ordersummary.js';
import { loadFromStorage } from '../../data/cart.js';
import { loadProducts, loadProductsfetch } from '../../data/products.js';

describe("Order Summary", () => {

  function setupCart() {
    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-Cart-Checkout-HTML"></div>
    `;

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([
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
    ]));

    loadFromStorage();
    renderOrderSummary();
  }

  beforeAll((done) => {
    loadProductsfetch().then(() => {
      done();
    });
  });
  afterEach(() => {
    localStorage.getItem.calls.reset();
  });

  /* ---------------- Rendering ---------------- */

  it("renders all cart items", () => {
    setupCart();

    const items = document.querySelectorAll(".js-test-cart");
    expect(items.length).toBe(3);
  });

  it("renders correct quantity for a product", () => {
    setupCart();

    const quantity = document.querySelector(
      ".js-test-quantitye43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );

    expect(quantity.textContent).toContain("Quantity:");
    expect(quantity.textContent).toContain("1");
  });

  /* ---------------- Delete ---------------- */

  it("removes an item when delete is clicked", () => {
    setupCart();

    const deleteLink = document.querySelector(
      ".delete-test-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );

    deleteLink.click();

    const items = document.querySelectorAll(".js-test-cart");
    expect(items.length).toBe(2);
  });

  /* ---------------- Update Quantity ---------------- */

  it("updates quantity when save is clicked", () => {
    setupCart();

    const cartItem = document.querySelector(
      ".js-cart-item-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );

    // Enter edit mode
    cartItem.querySelector(".update-quantity-link").click();

    const input = cartItem.querySelector(".quantity-input");
    input.value = 3;

    cartItem.querySelector(".save-quantity-link").click();

    const quantityLabel = cartItem.querySelector(".quantity-label");
    expect(quantityLabel.textContent).toBe("3");
  });

  /* ---------------- Delivery Option ---------------- */

  it("changes delivery option when clicked", () => {
    setupCart();

    const deliveryOption = document.querySelector(
      '.js-cart-item-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6 .js-delivery-options[data-option-id="3"]'
    );

    deliveryOption.click();

    const updatedItem = document.querySelector(
      ".js-cart-item-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );

    expect(updatedItem).not.toBeNull();
  });

});
