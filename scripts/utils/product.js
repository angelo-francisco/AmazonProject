import { products } from '../../data/products.js'


export const getProduct = (id) => {
    const matchingProduct = products.find(product => product.id === id);

    if (!matchingProduct) {
        throw new Error(`Produto com ID ${id} não encontrado.`);
    }

    return matchingProduct;
}