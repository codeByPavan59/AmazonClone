import {
  cart,
  deleteCartItem,
  updateDeliveryOption,
  updateQuantity,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import isSunSat from "../utils/isWeekend.js";

export function renderOrderSummary() {
  updateCartQuantity();
  let cartHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingItem = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartHTML += `<div class="cart-item-container js-cart-item-container js-cart-item-container-${
      matchingItem.id
    }">
          <div class="delivery-date">Delivery date: ${dateString}</div>

          <div class="cart-item-details-grid">
            <img
              class="product-image"
              src="${matchingItem.image}"
            />

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-price">$${matchingItem.getPrice()}</div>
              
              <div class="product-quantity js-product-quantity-${matchingItem.id}">
                <span> Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span> </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                  matchingItem.id
                }"> Update </span>
                <input class="quantity-input js-quantity-input-${
                  matchingItem.id
                }" data-product-id="${matchingItem.id}">
                <span class="save-quantity-link link-primary" data-product-id="${
                  matchingItem.id
                }">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${productId}" data-product-id="${productId}"> Delete </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingItem, cartItem)}
            </div>
          </div>
        </div>`;
  });

  function deliveryOptionsHTML(matchingItem, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option" data-product-id="${
        matchingItem.id
      }" data-delivery-option-id="${deliveryOption.id}">
        <input
          type="radio"
          ${isChecked ? `checked` : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>`;
    });
    return html;
  }
  document.querySelector(".js-order-summary").innerHTML = cartHTML;

  document.querySelectorAll(".js-update-link").forEach((link) => {
    const productId = link.dataset.productId;
    link.addEventListener("click", () => {
      console.log(productId);
      const cartItem = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      cartItem.classList.add("is-editing-quantity");

      console.log(cartItem);
    });
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    const productId = input.dataset.productId;
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        console.log(productId);
        const cartItem = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        cartItem.classList.remove("is-editing-quantity");
        const newQuantity = Number(
          document.querySelector(`.js-quantity-input-${productId}`).value
        );
        updateQuantity(productId, newQuantity);
        renderOrderSummary();
        renderPaymentSummary();
      } else if(event.key === 'Backspace') {
        input.value = '';
      }
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    const productId = link.dataset.productId;
    link.addEventListener("click", () => {
      console.log(productId);
      const cartItem = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      cartItem.classList.remove("is-editing-quantity");
      const newQuantity = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );
      updateQuantity(productId, newQuantity);
      renderOrderSummary();
      renderPaymentSummary();
      updateCartQuantity();
    });
  });

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      deleteCartItem(productId);
      let container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      renderOrderSummary();
      renderPaymentSummary();
      updateCartQuantity();
    });
  });

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector(".js-home-link").innerHTML = `${cartQuantity} items`;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    /*const productId = element.dataset.productId;
  const deliveryOptionId = element.dataset.deliveryOptionId;*/
    const { productId, deliveryOptionId } = element.dataset;
    element.addEventListener("click", () => {
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  const today = dayjs();
  const dayAfter = today.add(1, "month");
  const dayBefore = today.subtract(1, "days");
  console.log(dayAfter.format("MMMM dddd"));
  console.log(dayBefore.format("MMMM dddd"));
  const weekFormat = today.format("dddd");
  console.log(weekFormat);
  const weekend = today.subtract(4, "days");
  console.log(isSunSat(weekend.format("dddd")));
}
