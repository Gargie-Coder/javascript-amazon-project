import { renderCheckoutHeader } from "./checkout/checkoutheader.js";
import {renderOrderSummary} from "./checkout/ordersummary.js";
import {renderpaymentsummary} from "./checkout/paymentsummary.js";
import Cart from "../data/cart-class.js";
// import  "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";
loadProducts(()=>{// Callback after products are loaded
renderOrderSummary();
renderpaymentsummary();
renderCheckoutHeader();
});
