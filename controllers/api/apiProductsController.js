const {Product, ByRoom, ByTexture, Color} = require('../../database/models');



module.exports = {
    count: async (req, res) => {
        const products = await Product.findAll( {include: ["byRoom", "byTexture", "color"]})
        const byRoom = await ByRoom.findAll( {include: ["product"]})
        const byTexture = await ByTexture.findAll( {include: ["product"]})
       
    let byRoomCount = {};
    let byTextureCount = {};
    
    for(let i = 0; i < byRoom.length; i++){
            byRoomCount[byRoom[i].room] = {products: byRoom[i].product.length}
           
    }
    for(let i = 0; i < byTexture.length; i++){
        byTextureCount[byTexture[i].texture] = {products: byTexture[i].product.length}
      
}
      console.log("BY TEXTURE", byRoomCount)

            let productsArray = products.map(oneProduct =>{
                let colorArray = []
                for (let i = 0; i < oneProduct.color.length; i++){
                    colorArray.push(oneProduct.color[i])
                }
                let colores = []
                for (let i = 0; i < colorArray.length; i++){
                    colores.push(colorArray[i].dataValues.color)
                }
                let producto = {
                        id: oneProduct.dataValues.id,
                        name: oneProduct.dataValues.name,
                        description: oneProduct.dataValues.description,
                        byRoom: oneProduct.dataValues.byRoom.room,
                        byTexture: oneProduct.dataValues.byTexture.texture,
                        price: oneProduct.dataValues.price,
                        color: colores,
                        image: `http://localhost:4000/img/products/${oneProduct.dataValues.image}`,
                        detail: `http://localhost:4000/products/detail/${oneProduct.dataValues.id}`,
                    }
                    return producto
                })
            return res.status(200).json({
                count: products.length,
                countByCategories: {
                    byRoom: byRoomCount,
                    byTexture:byTextureCount
                },
                data: productsArray,
                status: 200
        })
    },
    
    detail: async (req, res) => {
        const products = await Product.findByPk(req.params.id, {include: ["byRoom", "byTexture", "color"]})
        if(!products){
            return res.status(200).json({
                msg: "This product is no longer available",
                status: 204
            })
        } else {
        
        let colorArray = []
        for (let i = 0; i < products.color.length; i++){
            colorArray.push(products.color[i])
        }
        let colores = []
        for (let i = 0; i < colorArray.length; i++){
            colores.push(colorArray[i].dataValues.color)
        }
            const oneProduct = {
                id: products.dataValues.id,
                name: products.dataValues.name,
                description: products.dataValues.description,
                byRoom: products.byRoom.dataValues.room,
                byTexture: products.byTexture.dataValues.texture,
                color: colores,
                image: `http://localhost:4000/img/usersImg/${products.dataValues.image}`
            }
            return res.status(200).json({
                data: oneProduct,
                status: 200
            })}
        
    },
    
}