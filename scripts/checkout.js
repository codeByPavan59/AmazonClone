import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/backend-practice.js";
import "../data/car.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
import { greetings } from "../data/lesson18.js";

async function loadPage() {
  try {
    // throw 'error1';
    const value = await Promise.all([loadProductsFetch(),loadCartFetch()]);
    
  } catch (error) {
    console.log("Unexpected error. Please try again later");
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

greetings();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),

]).then((values) => {
  console.log(values);
  
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  });
}).then((value) => {
    console.log(value);

    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  }).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary(); 
  });
});
*/
