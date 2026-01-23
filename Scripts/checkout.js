import { renderCheckoutHeader } from "./checkout/checkoutheader.js";
import {renderOrderSummary} from "./checkout/ordersummary.js";
import {renderpaymentsummary} from "./checkout/paymentsummary.js";
import { loadProducts,loadProductsfetch } from "../data/products.js";
import { loadCart } from "../data/cart.js"; 
// import Cart from "../data/cart-class.js";
// import  "../data/backend-practice.js";
Promise.all([
  loadProductsfetch(),
,new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
 })
]).then(()=>{
    renderOrderSummary();
    renderpaymentsummary();
    renderCheckoutHeader();
});


/*new Promise((resolve) => {

  console.log("start promise");
  loadProducts(() => {
//     console.log("finished loading");
     resolve(value1);
  });
}).then((value) => {
  console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
 }).then(()=>{
    renderOrderSummary();
    renderpaymentsummary();
    renderCheckoutHeader();
  });

});
// loadProducts(() => {// Callback after products are loaded
//   loadCart(() => {// Callback after cart is loaded
// renderOrderSummary();
// renderpaymentsummary();
// renderCheckoutHeader();});});
*/