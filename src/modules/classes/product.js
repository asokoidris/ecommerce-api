const product =require ('../../model/products');

class Product{
    constructor({
        title,
        desc,
        price,
        color,
        size,
        image,
        categories
    }){
        this.title = title || ''
        this.desc = desc || ''
        this.price = price || ''
        this.color = color || ''
        this.size = size || ''
        this.image = image || ''
        this.categories = categories || ''

    }
}

module.exports = Product