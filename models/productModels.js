
let products =[];

function addProducts(product){   

    if (!products.includes(product)){
        products.push(product)
        return 'producto agregado correctamente'
    }else{
        throw new Error('el producto ya existe')
    }
}
function getProducts(){
    return products;
}

module.exports = {addProducts,getProducts};
