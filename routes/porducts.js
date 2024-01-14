const auth  = require("../middlewares/auth");
const {Product} = require("../models/product");
const express = require("express");
const prodcutRouter = express.Router();

prodcutRouter.get("/product/get-products",async(req,res)=>{
    try{
        const  product = await Product.find({})
        res.status(200).json(product);
    }catch(e){
        res.status(500).json(e);
    }
})

  prodcutRouter.get("/api/products/search/:name", auth, async (req, res) => {
    try {
      const products = await Product.find({ name: {$regex:req.params.name, $options:"i"} });
      res.json(products);
    } catch (e) {
        console.log(e); 
      res.status(500).json({ error: e.message });
    }
  });

  prodcutRouter.post("/api/products/rate-product", auth, async (req, res) => {
    try {
        const {rating,id} = req.body;
        let product = await Product.findById(id);

        for(let i= 0;i<product.rating.length;i++){
            if(product.rating[i].userId = id){
                product.rating.splice(i,1);
                break;
            }
        }

        const ratingSchema = {
            userId:id,
            rating
        }

        product.rating.push(ratingSchema);
        product = await product.save();
        
      res.json(products);
    } catch (e) {
        console.log(e); 
      res.status(500).json({ error: e.message });
    }
  });
  
module.exports = prodcutRouter;