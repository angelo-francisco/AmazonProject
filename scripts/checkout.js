import { cart, removeFromCart, saveToStorange, updateDeliveryOption } from '../data/cart.js'
import { delivery } from '../data/delivery.js'
import { products } from '../data/products.js'
import { dateFormated } from './utils/date.js'
import { showPriceProduct } from './utils/money.js'


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

    const deliveryOptionId = cartItem.delivery
    let deliveryOption

    delivery.forEach(option => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option
        }
    })

    productsHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: <span class="js-delivery-date">${dateFormated(deliveryOption.days)}</span>
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
            ${updateDeliveryOptionsHTML(matchingProduct, cartItem)}
            
            </div>
        </div>
    </div>`
})

document.querySelector('.js-order-summary')
    .innerHTML = productsHTML


// function updateDeliveryOption() {

// }

function updateDeliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    delivery.forEach(options => {
        const dateString = dateFormated(options.days)

        const isChecked = options.id === cartItem.delivery

        html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${options.id}" onclick="this.querySelector('input').checked = true">
            <input type="radio" class="delivery-option-input" ${isChecked ? 'checked' : ''} name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${options.priceCents === 0 ? 'FREE' : '$' + options.priceCents.toFixed(2)} - Shipping
                </div>
            </div>
        </div>`
    })

    return html;
}


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

document.querySelectorAll('.js-delivery-option')
    .forEach(option => {
        option.addEventListener('click', () => {
            const { productId, deliveryOptionId } = option.dataset
            
            updateDeliveryOption(productId, deliveryOptionId)

            let days;

            delivery.forEach(option => {
                if (option.id === deliveryOptionId) {
                    days = option.days
                }
            })

            document.querySelector(`.js-cart-item-container-${productId}`)
                .querySelector('.js-delivery-date')
                .innerText = dateFormated(days)
        })
    })