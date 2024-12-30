export const cart = JSON.parse(localStorage.getItem('cart')) || []

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

