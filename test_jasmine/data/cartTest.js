import { Cart, loadFromStorage, updateCartQuantity } from '../../data/cart.js';
describe('Test suite: add to cart', () => {
  let testContainer;

  beforeEach(() => {
    testContainer = document.createElement('div');
    document.body.appendChild(testContainer);

    // 1. Spy ko sirf EK BAAR yahan lagao
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem'); 
    
    // loadFromStorage() ko yahan call mat karo agar har test mein alag data chahiye
  });

  afterEach(() => {
    testContainer.remove();
  });

  // TEST 1: Khali Cart
  it('adds a new product', () => {
    // Purane spy ko hi naya kaam do (Spy create nahi karna, sirf behavior update karna hai)
    localStorage.getItem.and.returnValue(JSON.stringify([]));
    loadFromStorage();

    testContainer.innerHTML = `<div class="js-quantity-selector-123"><select><option value="1">1</option></select></div>`;
    updateCartQuantity("123");

    expect(Cart.length).toEqual(1);
  });

  // TEST 2: Existing Product (Jo tum try kar rahi ho)
  it('updates quantity of an existing product', () => {
    // Wahi purana spy, lekin ab naya data return karega
    localStorage.getItem.and.returnValue(JSON.stringify([{
      productId: "123",
      quantity: 1,
      deliverOptionId: "1"
    }]));
    
    loadFromStorage(); // Ab Cart mein pehle se ek item aa gaya

    testContainer.innerHTML = `
      <div class="js-quantity-selector-123">
        <select>
          <option value="5" selected>5</option>
        </select>
      </div>`;

    updateCartQuantity("123");

    // Check karo: Cart length 1 hi rehni chahiye, lekin quantity 5 ho jani chahiye
    expect(Cart.length).toEqual(1);
    expect(Cart[0].quantity).toEqual(5);
  });
});