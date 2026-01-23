import { Cart } from "../../data/cart.js";
import { getproduct } from "../../data/products.js";
import { getdeliveryoption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import {addOrder} from '../../data/orders.js';

export function renderpaymentsummary() {
  let productpriceTotalCents = 0;
  let shippingpriceTotalCents = 0;

  Cart.forEach((CartItem) => {
    const matchingProduct = getproduct(CartItem.productId);
    if (!matchingProduct) return;

    const deliveryoption = getdeliveryoption(CartItem.deliverOptionId);

    productpriceTotalCents += matchingProduct.priceCents * CartItem.quantity;

    if (deliveryoption) {
      shippingpriceTotalCents += Number(deliveryoption.priceCents);
    }
  });

  const totalbeforetaxCents = productpriceTotalCents + shippingpriceTotalCents;
  const totaltaxCents = Math.round(totalbeforetaxCents * 0.1);
  const ordertotalCents = totalbeforetaxCents + totaltaxCents;

  const paymentsummaryHTML = `
    <div class="payment-summary">
      <div class="payment-summary-title">Order Summary</div>

      <div class="payment-summary-row">
        <div>Items (${Cart.length}):</div>
        <div class="payment-summary-money">${formatCurrency(productpriceTotalCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${formatCurrency(shippingpriceTotalCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${formatCurrency(totalbeforetaxCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${formatCurrency(totaltaxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${formatCurrency(ordertotalCents)}</div>
      </div>

      <button class="place-order-button button-primary js-place-order">
        Place your order
      </button>
    </div>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentsummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json();
        addOrder(order);

      } catch (error) {
        console.log('Unexpected error. Try again later.');
      }

      window.location.href = 'orders.html';
    });
}