import { addToCart, cart, loadFromStorage, updateDeliveryOption} from "../../data/cart.js";

describe('test suite: addToCart', () => {
  
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    
    addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(cart[0].quantity).toEqual(2);
  });
  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem('cart'));
    loadFromStorage();

    addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(cart[0].quantity).toEqual(1);
  });
})