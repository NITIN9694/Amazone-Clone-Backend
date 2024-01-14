const express = require("express");
const adminRouter = express.Router();
const admin = require("../middlewares/auth");
const { Product } = require("../models/product");


adminRouter.post("/admin/add-product",admin,async(req,res)=>{
    try{
        const {name,description,images,quantity,price,category} = req.body;
        let product =await Product(
            
           {
            name,
            description,
            images,
            quantity,
            price,
            category
           }
        )

        product = await product.save();
        res.status(200).json(product);
    }catch(e){
        console.log(e);
        res.status(500).json(e);
       
    }
})




adminRouter.post("/product/delete-product",admin,async(req,res)=>{
    try{
      const {id} = req.body;
      let product = await Product.findByIdAndDelete(id);
      product = await product.save();
      res.status(200).json(product);

    }catch(e){
        console.log(e);
        res.status(500).json(e);
    }
})

module.exports = adminRouter;