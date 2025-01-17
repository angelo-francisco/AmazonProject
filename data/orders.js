export let orders = JSON.parse(localStorage.getItem('orders')) || []

export function addOrder(order) {
    orders.unshift(order)

    saveToStorange()
}

function saveToStorange() {
    localStorage.setItem('orders', JSON.stringify(orders))
}