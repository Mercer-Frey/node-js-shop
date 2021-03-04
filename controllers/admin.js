const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path:'/admin/add-product'
    });
}
module.exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description)
    product.save();
    res.redirect('/');
}

module.exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    console.log(editMode);
    if(!editMode) return res.redirect('/');
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!prodId) return res.redirect('/');
        res.render('admin/edit-product', {
            pageTitle: 'Add Product', 
            path:'/admin/edit-product', 
            editing: editMode,
            product,
        });
    })
}
module.exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedtitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updatedprice = req.body.price;
    const updateddescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedtitle, updatedimageUrl, updatedprice, updateddescription)
    updatedProduct.save();
    res.redirect('/admin/products')
}
module.exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products')

}
module.exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        })
    });
}