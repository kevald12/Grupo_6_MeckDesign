const res = require('express/lib/response');
const DB = require ('../../database/models/');
const product = require('../../database/models/product');
const Op = DB.sequelize.Op;

module.exports = {
    count: (req, res) => {
        DB.Product
        .findAll()
        .then (products =>{
            return res.status(200).json({
                count: products.length,
                data: products,
                status: 200
            })

        })
    },
    
    show: (req, res) => {
        DB.Product
        .findByPk(req.params.id)
        .then(product => {
            return res.status(200).json({
                data: product,
                status: 200
            })
        })
    }

}