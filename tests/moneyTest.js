import { showPriceProduct } from '../scripts/utils/money.js'

console.log("Test Suite: Money.js")

const pass = () => {
    console.log('==========Passed==========')
}
const fail = () => {
    console.log('==========Failed==========')
}

if (showPriceProduct(2095) === '20.95') {
    pass()
} else {
    fail()
}

if (showPriceProduct(0) === '0.00') {
    pass()
} else {
    fail()
}

if (showPriceProduct(2000.5) === '20.01') {
    pass()
} else {
    fail()
}

if (showPriceProduct(2000.4) === '20.00') {
    pass()
} else {
    fail()
}