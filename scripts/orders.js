import { orders } from "../data/orders.js";
import { showPriceProduct } from "./utils/money.js";
import { getProduct } from "./utils/product.js";
import { loadProductsFetch } from "../data/products.js";
import { formatDate } from './utils/date.js'
import { cart } from "../data/cart.js"

function updateCartQuantity() {
  let cartQuantity = 0

  cart.forEach(cartProduct => {
    cartQuantity += cartProduct.quantity
  })
  console.log(cartQuantity)
  document.querySelector('.cart-quantity')
    .innerHTML = cartQuantity
}


loadProductsFetch().then(() => {
  updateCartQuantity()

  function generateProductForOrder(products, orderId) {
    let productsHTML = ''

    products.forEach((tempProduct) => {
      let product = getProduct(tempProduct.productId)

      productsHTML += `
      <div class="product-image-container">
      <img src="${product.image}">
      </div>
      
      <div class="product-details">
      <div class="product-name">
      ${product.name}
      </div>
      <div class="product-delivery-date">
      Arriving on: ${formatDate(tempProduct.estimatedDeliveryTime).format('ddd, MMMM DD')}
      </div>
      <div class="product-quantity">
      Quantity: ${tempProduct.quantity}
      </div>
      <button class="buy-again-button button-primary">
      <img class="buy-again-icon" src="images/icons/buy-again.png">
      <span class="buy-again-message">Buy it again</span>
      </button>
      </div>
      
      <div class="product-actions">
            <a href="tracking.html?orderId=${orderId}&productId=${tempProduct.productId}">
            <button class="track-package-button button-secondary">
            Track package
            </button>
            </a>
            </div>`
    })

    return productsHTML
  }


  orders.forEach(order => {
    let ordersHTML = ''


    ordersHTML += `
          <div class="order-container">
          
          <div class="order-header">
          <div class="order-header-left-section">
          <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${formatDate(order.orderTime).format('MMMM DD')}</div>
          </div>
          <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${showPriceProduct(order.totalCostCents)}</div>
          </div>
          </div>
          
          <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
          </div>
          </div>
          
          <div class="order-details-grid">
          ${generateProductForOrder(order.products, order.id)}
          </div>`
    document.querySelector('.js-orders-grid').innerHTML += ordersHTML
  });
})