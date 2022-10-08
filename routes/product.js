const router = require("express").Router();
const Product = require("../models/Product");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

//CREATE
router.post("/add", verifyTokenAndAdmin, async (req,res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/delete/:product_title", verifyTokenAndAdmin, async (req,res) =>{
    const productTitle = req.params.product_title;
    try {
        const result = await Product.deleteOne({ title: new RegExp('^'+productTitle+'$', "i" )})
        console.log(result);
        if(result)
        res.status(200).json("Product has been deleted!")
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET Specific Product
router.get("/find/:product_title", async (req,res) =>{
    const productTitle = req.params.product_title;
    try {
        const product = await Product.findOne({ title: new RegExp('^'+productTitle+'$', "i" )});
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET ALL Products
router.get("/find_all", async (req, res) => {
    let products;
    try {
      products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;