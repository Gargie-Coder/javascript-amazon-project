import { renderCheckoutHeader } from "./checkout/checkoutheader.js";
import {renderOrderSummary} from "./checkout/ordersummary.js";
import {renderpaymentsummary} from "./checkout/paymentsummary.js";
import Cart from "../data/cart-class.js";

renderOrderSummary();
renderpaymentsummary();
renderCheckoutHeader();