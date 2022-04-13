// const res = require('express/lib/response');
// const DB = require ('../../database/models/');
const {Product} = require('../../database/models');
// const Op = sequelize.Op;

module.exports = {
    count: async (req, res) => {
        const products = await Product.findAll()
        .then (products =>{
            return res.status(200).json({
                count: products.length,
                data: products,
                status: 200
            })

        })
    },
    
    show: async (req, res) => {
        const products = await Product.findByPk(req.params.id)
        .then(product => {
            return res.status(200).json({
                data: product,
                status: 200
            })
        })
    },
    store: (req,res) => {

    }

}