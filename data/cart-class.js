import { delivery } from "./delivery.js"

class Cart {
    constructor(localStorageKeyCart, localStorageKeyDeliveryOption) {
        this.localStorageKeyCart = localStorageKeyCart
        this.localStorageKeyDeliveryOption = localStorageKeyDeliveryOption

        this.loadCart()
    }

    loadCart() {
        const savedCart = localStorage.getItem(this.localStorageKeyCart)
        this.cartItems = savedCart === "undefined" ? [] : JSON.parse(savedCart)
    }

    saveToStorange() {
        localStorage.setItem(this.localStorageKeyCart, JSON.stringify(this.cartItems))
        localStorage.setItem(this.localStorageKeyDeliveryOption, JSON.stringify(delivery))
    }

    addToCart(productId, quantity = 1) {
        let matchingProduct

        this.cartItems.forEach(cartProduct => {
            if (cartProduct.id === productId) {
                matchingProduct = cartProduct
            }
        })

        if (matchingProduct) {
            matchingProduct.quantity += quantity
        } else {
            this.cartItems.push({
                id: productId,
                quantity: quantity,
                delivery: "1"
            })
        }

        this.saveToStorange()
    }

    removeFromCart(productId) {
        let newCart = []

        this.cartItems.forEach(product => {
            if (productId !== product.id) {
                newCart.push(product)
            }
        });

        this.cartItems = newCart

        this.saveToStorange()
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingProduct

        this.cartItems.forEach(product => {
            if (product.id === productId) {
                matchingProduct = product
            }
        })
        matchingProduct.delivery = deliveryOptionId

        this.saveToStorange()
    }
}

const cart = new Cart()

cart.localStorageKeyCart = 'cart-oop'
cart.localStorageKeyDeliveryOption = 'delivery-oop'

const bussinessCart = new Cart()

bussinessCart.localStorageKeyCart = 'bussiness-cart-oop'
bussinessCart.localStorageKeyDeliveryOption = 'bussiness-delivery-oop'


cart.addToCart('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f')

bussinessCart.addToCart('36c64692-677f-4f58-b5ec-0dc2cf109e27')

console.log(cart, bussinessCart)


// Verification of the instance
console.log(bussinessCart instanceof Cart)
