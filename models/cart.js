const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart{
    static addProduct(id, productPrice){
        fs.readFile(p, (error, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!error){
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct}
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = { id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), error => {
                console.log(error);
            })
        })
    }
    static deleteProduct(id, productPrice){
        fs.readFile(p, (error, fileContent) => {
            if(error) return;
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product) return;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice -= productPrice * product.qty;
            fs.writeFile(p, JSON.stringify(updatedCart), error => {
                console.log(error);
            })
        })
    }
    static getCart(cb){
        fs.readFile(p, (error, fileContent) => {
            const cart = JSON.parse(fileContent);
                if(error) return cb(null);
                cb(cart);
            })
    }
}