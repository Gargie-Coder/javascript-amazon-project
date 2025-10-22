// scripts/checkout.js
import { Cart, removeFromCart, updatedeliveryoption, updateQuantity, updateHeaderCartQuantity } from "../../data/cart.js";
import { products,getproduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions,getdeliveryoption } from "../../data/deliveryOptions.js"; 
import { renderpaymentsummary } from "./paymentsummary.js"; 
export function renderOrderSummary(){
let CartCheckoutHTML = "";

// helper to render delivery options for a product/cart item
function deliverOptionsHTML(matchingProduct,cartItem){ 
  let HTML = "";
  deliveryOptions.forEach((deliveryOption) => {

    const today=dayjs();
    const deliverydate=today.add(deliveryOption.deliveryDays,'days');
    const dayString=deliverydate.format('dddd,MMMM D');
   const priceCents = Number(deliveryOption.PriceCents);
  const priceDisplay = priceCents === 0 ? 'Free' : formatCurrency(priceCents);
    const ischecked=deliveryOption.id===cartItem.deliverOptionId;
    HTML += `


    <div class="delivery-option js-delivery-options" data-product-id="${matchingProduct.id}" data-option-id="${deliveryOption.id}">
      <input type="radio" ${ischecked?'checked':''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">${dayString}</div>
        <div class="delivery-option-price">${formatCurrency(priceCents)}</div>
      </div>
    </div>
    
    `
    
  })
  return HTML;
}

// build HTML for each cart item
Cart.forEach((CartItem) => {
  const productId = CartItem.productId;
  const matchingProduct = getproduct(productId);
  if (!matchingProduct) return;
  const deliverOptionId = CartItem.deliverOptionId;
   const deliveryoption = getdeliveryoption(deliverOptionId);

  const dayString = dayjs().add(deliveryoption.deliveryDays,'days').format('dddd, MMM D');

  CartCheckoutHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">Delivery date: ${dayString}</div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">${formatCurrency(matchingProduct.priceCents)}</div>

          <div class="product-quantity">
            <span>Quantity: <span class="quantity-label">${CartItem.quantity}</span></span>
            <span data-product-id="${matchingProduct.id}" class="update-quantity-link link-primary">Update</span>

            <input class="quantity-input" type="number" min="0" value="${CartItem.quantity}" />

            <span data-product-id="${matchingProduct.id}" class="save-quantity-link link-primary">Save</span>
            <span data-product-id="${matchingProduct.id}" class="delete-quantity-link link-primary">Delete</span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>

          ${deliverOptionsHTML(matchingProduct,CartItem)}
        </div>
      </div>
    </div>
  `;
});

// insert HTML into the page
document.querySelector(".js-Cart-Checkout-HTML").innerHTML = CartCheckoutHTML;

const today=dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd,MM D'));

/* --- event handlers --- */

// delete
document.querySelectorAll(".delete-quantity-link").forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    const productId = deleteLink.dataset.productId;
    removeFromCart(productId);
    const el = document.querySelector(`.js-cart-item-container-${productId}`);
    if (el) el.remove();
    updateHeaderCartQuantity();
    renderpaymentsummary();
  });
});

// update (enter edit mode + prefill)
document.querySelectorAll(".update-quantity-link").forEach((updateLink) => {
  updateLink.addEventListener("click", () => {
    const productId = updateLink.dataset.productId;
    const cartItemElement = document.querySelector(`.js-cart-item-container-${productId}`);
    if (!cartItemElement) return;
    cartItemElement.classList.add("is-editing-quantity");

    const input = cartItemElement.querySelector(".quantity-input");
    const current = cartItemElement.querySelector(".quantity-label").textContent;
    input.value = current;
    input.focus();
    
  });
});

// save (read input, update data and UI)
document.querySelectorAll(".save-quantity-link").forEach((saveLink) => {
  saveLink.addEventListener("click", () => {
    const productId = saveLink.dataset.productId;
    const cartItemElement = document.querySelector(`.js-cart-item-container-${productId}`);
    if (!cartItemElement) return;

    const input = cartItemElement.querySelector(".quantity-input");
    const new_quantity = Number(input.value);

    if (new_quantity > 0) {
      updateQuantity(productId, new_quantity);
      cartItemElement.querySelector(".quantity-label").textContent = new_quantity;
    } else {
      // remove if zero or invalid
      removeFromCart(productId);
      cartItemElement.remove();
    }

    cartItemElement.classList.remove("is-editing-quantity");
    updateHeaderCartQuantity();
    renderpaymentsummary();
  });
});

// initial header update (in case page opened directly)
updateHeaderCartQuantity();

document.querySelectorAll('.js-delivery-options').forEach((option)=>{
  option.addEventListener('click',()=>{
    const productid=option.dataset.productId;
    const new_optionid=option.dataset.optionId;
    updatedeliveryoption(productid,new_optionid);
    renderOrderSummary();
    renderpaymentsummary();
  })
})

}
renderOrderSummary();
