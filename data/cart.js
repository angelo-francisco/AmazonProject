import { delivery } from "./delivery.js"

export let cart = JSON.parse(localStorage.getItem('cart')) || []

export const loadCart = () => {
    cart = JSON.parse(localStorage.getItem('cart')) || []
}

export function saveToStorange() {
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('delivery', JSON.stringify(delivery))
}

export function addToCart(productId, quantity=1) {
    let matchingProduct

    cart.forEach(cartProduct => {
        if (cartProduct.productId === productId) {
            matchingProduct = cartProduct
        }
    })

    if (matchingProduct) {
        matchingProduct.quantity += quantity
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            delivery: "1"
        })
    }
    
    saveToStorange()
}


export function removeFromCart(productId) {
    let newCart = []

    cart.forEach(product => {
        if (productId !== product.productId) {
            newCart.push(product)
        }
    });

    cart = newCart

    saveToStorange()
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingProduct

    cart.forEach(product => {
        if (product.productId === productId) {
            matchingProduct = product
        }
    })

    matchingProduct.delivery = deliveryOptionId

    saveToStorange()
}