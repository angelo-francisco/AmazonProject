export let cart = JSON.parse(localStorage.getItem('cart')) || []


function saveToStorange() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId, quantity = 1) {
    let matchingProduct

    cart.forEach(cartProduct => {
        if (cartProduct.id === productId) {
            matchingProduct = cartProduct
        }
    })

    if (matchingProduct) {
        matchingProduct.quantity += quantity
    } else {
        cart.push({
            id: productId,
            quantity: quantity
        })
    }

    saveToStorange()
}


export function removeFromCart(productId) {
    let newCart = []

    cart.forEach(product => {
        if (productId !== product.id) {
            newCart.push(product)
        }
    });

    cart = newCart

    saveToStorange()
}
