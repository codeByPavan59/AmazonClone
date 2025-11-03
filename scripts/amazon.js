import { cart, addToCart } from "../data/cart.js";
// import * as cartModule from '../data/cart.js';
// const cart = cartModule.cart;
// let addToCart = cartModule.addToCart;
import { products, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProductsFetch(renderProductsGrid);

function renderProductsGrid() {
  updateCartQuantity();
  let productHTML = "";
  products.forEach((product) => {
    const html = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src=${product.getStarsUrl()}>
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}
          
          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>
        `;
    productHTML += html;
  });

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart?.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }

  document.querySelector(".products-grid").innerHTML = productHTML;
  /*document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});*/

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const quantity = Number(
        document.querySelector(`.js-quantity-selector-${productId}`).value
      );
      addToCart(productId, quantity);
      const element = document.querySelector(`.js-added-${productId}`);
      element.classList.add("added");
      setTimeout(() => {
        element.classList.remove("added");
      }, 2000);
      /*let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;*/
      updateCartQuantity();
    });
  });
}
