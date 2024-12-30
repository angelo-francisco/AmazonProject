export let cart = JSON.parse(localStorage.getItem('cart')) || []

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

    localStorage.setItem('cart', JSON.stringify(cart))
}


export function removeFromCart(productId) {
    let newCart = []

    cart.forEach(product => {
        if (productId !== product.id) {
            newCart.push(product)
        }
    });

    cart = newCart

    localStorage.setItem('cart', JSON.stringify(cart))
}
