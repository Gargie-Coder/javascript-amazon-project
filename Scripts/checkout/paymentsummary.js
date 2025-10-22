 import {Cart} from "../../data/cart.js";
import { getproduct } from "../../data/products.js";
import { getdeliveryoption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";


 export function renderpaymentsummary() {
  let productpriceTotalCents = 0;
  let shippingpriceTotalCents = 0;
 Cart.forEach((CartItem) => {
  
   const productId = CartItem.productId;
   const matchingProduct = getproduct(productId);
   const deliverOptionId = CartItem.deliverOptionId;
   let deliveryoption = getdeliveryoption(deliverOptionId);
   if (!matchingProduct) return;
   productpriceTotalCents += matchingProduct.priceCents * CartItem.quantity;
  
   shippingpriceTotalCents += Number(deliveryoption.PriceCents);
 });
 const totalbeforetaxCents = productpriceTotalCents + shippingpriceTotalCents;
 const totaltaxCents = totalbeforetaxCents*0.1;
 const ordertotalCents = totalbeforetaxCents + totaltaxCents;
 let paymentsummaryHTML="";
 paymentsummaryHTML+=`
     <div class="payment-summary">
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${Cart.length}):</div>
      <div class="payment-summary-money">${ formatCurrency(productpriceTotalCents) }</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">${ formatCurrency(shippingpriceTotalCents) }</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">${ formatCurrency(totalbeforetaxCents) }</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">${ formatCurrency(totaltaxCents) }</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">${ formatCurrency(ordertotalCents) }</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  </div>
 `
 
 
 document.querySelector(".js-payment-summary").innerHTML=paymentsummaryHTML;
 }