export const cart = []

export function addToCart(productId) {
    let matchingProduct

    cart.forEach(cartProduct => {
        if (cartProduct.id === productId) {
            matchingProduct = cartProduct
        }
    })

    if (matchingProduct) {
        matchingProduct.quantity += 1
    } else {
        cart.push({
            id: productId,
            quantity: 1
        })
    }
}

