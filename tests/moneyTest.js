import { showPriceProduct } from '../scripts/utils/money.js'

if (showPriceProduct(2095) === 20.95) {
    console.log('Passed')
} else {
    console.log('Failed')
}