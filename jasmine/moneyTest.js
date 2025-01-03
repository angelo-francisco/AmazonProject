import { showPriceProduct } from '../scripts/utils/money.js'

describe('Test suite: show price product', () => {
    it("converts a normal cents to a real price", () => {
        expect(showPriceProduct(2095)).toEqual('20.95')
    })

    it('works with 0', () => {
        expect(showPriceProduct(0)).toEqual('0.00')
    })
    
    it('works with roundable numbers', () => {
        expect(showPriceProduct(2000.5)).toEqual('20.01')
    })
})