import { cart, addToCart } from '../data/cart.js'
import { products, Clothing } from '../data/products.js'

updateCartQuantity()

const productsSection = document.querySelector("#products-section")

products.forEach(product => {
  productsSection.innerHTML +=
    `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="select-${product.id}">
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
          ${product.extraInfo()}
        
        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `
})

function updateCartQuantity() {
  let cartQuantity = 0

  cart.forEach(cartProduct => {
    cartQuantity += cartProduct.quantity
  })

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity
}


document.querySelectorAll('.js-add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId
    const quantity = parseInt(document.querySelector(`.select-${productId}`).value)

    addToCart(productId, quantity)
    updateCartQuantity()

    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`)
    addedToCart.style.opacity = "1"

    setTimeout(() => {
      addedToCart.style.opacity = "0"
    }, 1500);

  })
})