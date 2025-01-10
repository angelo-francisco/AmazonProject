import { addToCart, cart, loadCart } from '../../data/cart.js'

localStorage.clear()

describe('Test suite: Cart', () => {
    it('Adding elements a new product in the cart', () => {
        
        spyOn(Storage.prototype, 'setItem')
        spyOn(Storage.prototype, 'getItem').and.callFake(() => {
            return JSON.stringify([])
        })
        
        loadCart()
        
        addToCart('bc2847e9-5323-403f-b7cf-57fde044a955', 3)
        
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(cart[0].id).toEqual('bc2847e9-5323-403f-b7cf-57fde044a955')
        expect(cart[0].quantity).toEqual(3)
    });
    
    it('Adding elements an existing product in the cart', () => {
        spyOn(Storage.prototype, 'setItem')

        spyOn(Storage.prototype, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: 'bc2847e9-5323-403f-b7cf-57fde044a955', 
                quantity: 1,
                delivery: '1'
            }])
        })

        loadCart()

        addToCart('bc2847e9-5323-403f-b7cf-57fde044a955')

        expect(cart[0].quantity).toEqual(2)
    })

})