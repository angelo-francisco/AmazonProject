import { orders } from "../data/orders.js"
import { products, loadProductsFetch } from "../data/products.js"
import { formatDate } from "./utils/date.js"


loadProductsFetch().then(() => {
    const url = new URL(window.location.href)

    const orderId = url.searchParams.get('orderId')
    const productId = url.searchParams.get('productId')
    const order = orders.find((order) => order.id === orderId)

    let realProduct
    let productFromOrder

    realProduct = products.find(item => item.id === productId)
    productFromOrder = order.products.find(item => item.productId === productId)

    document.querySelector('.delivery-date')
        .innerText = `Arriving on ${formatDate(productFromOrder.orderTime).format('dddd, MMMM DD')}`

    document.querySelector('.product-info-name')
        .innerText = realProduct.name

    document.querySelector('.product-info-quantity')
        .innerText = `Quantity: ${productFromOrder.quantity}`

    const img = document.querySelector('.product-image')
    img.setAttribute('src', realProduct.image)
})