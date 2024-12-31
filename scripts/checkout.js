import { cart, removeFromCart, saveToStorange } from '../data/cart.js'
import { products } from '../data/products.js'
import { showPriceProduct } from './utils/money.js'

hello()

updateCartItems()

let productsHTML = ''

function updateCartItems() {
    document.querySelector('.return-to-home-link')
        .innerText = `${cart.length} items`
}

cart.forEach(cartItem => {
    let matchingProduct

    products.forEach(product => {
        if (product.id === cartItem.id) {
            matchingProduct = product
        }
    })

    productsHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${showPriceProduct(matchingProduct)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                Update
                </span>
                <div class="js-update-product-quantity-${matchingProduct.id}" style="display: none;">
                <input type="number" placeholder="New quantity" id="js-save-quantity"/>
                <span class="save-quantity-link link-primary js-save-link">
                Save
                </span>
                </div>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>`
})

document.querySelector('.js-order-summary')
    .innerHTML = productsHTML


document.querySelectorAll('.js-delete-link')
    .forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId

            removeFromCart(productId)

            document.querySelector(`.js-cart-item-container-${productId}`)
                .remove()

            updateCartItems()
        })
    })

document.querySelectorAll('.js-update-quantity-link')
    .forEach(linkUpdate => {
        linkUpdate.addEventListener('click', () => {
            const productIdUpdate = linkUpdate.dataset.productId
            let deleteButton = Array.from(document.querySelectorAll('.js-delete-link'))
                .find(linkDelete => linkDelete.dataset.productId === productIdUpdate)

            deleteButton.style.display = 'None'
            linkUpdate.style.display = 'None'

            const updateQuantity = document.querySelector(`.js-update-product-quantity-${productIdUpdate}`)
            updateQuantity.style.display = 'block'
 

            updateQuantity.querySelector('span')
                .addEventListener('click', () => {
                    const inputQuantity = (updateQuantity.querySelector('input'))
                    const newQuantity = parseInt(inputQuantity.value)


                    if (!newQuantity) {
                        deleteButton.style.display = ''
                        linkUpdate.style.display = ''
                        updateQuantity.style.display = 'none'
                    } else if (newQuantity < 0 || newQuantity > 10) {
                        inputQuantity.style.border = '3px solid red'
                    } else {
                        cart.forEach(product => {
                            if (product.id === productIdUpdate) {
                                product.quantity = newQuantity
                            }
                        })

                        deleteButton.style.display = ''
                        linkUpdate.style.display = ''
                        saveToStorange()

                        document.querySelector(`.js-cart-item-container-${productIdUpdate} span.quantity-label`)
                            .innerText = newQuantity

                        updateQuantity.style.display = 'none'
                    }

                })
        })
    })