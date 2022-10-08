const router = require("express").Router();
const Cart = require("../models/Cart");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

//CREATE
router.post("/add", verifyToken, async (req,res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err);
    }
})


//DELETE
router.delete("/delete/:cartId", verifyTokenAndAuthorization, async (req,res) =>{
    // cartId is the Mongo objectID of that cart
    try {
        await Cart.deleteOne({ _id: req.params.cartId })
        res.status(200).json("Product of Cart has been deleted!")
    } catch (err) {
        res.status(500).json(err);
    }
});

//CLEAR CART
router.delete("/clear/:user_name", verifyTokenAndAuthorization, async (req,res) =>{
    const userName = req.params.user_name;
    try {
        await Cart.deleteMany({ username: userName })
        res.status(200).json("Cart has been cleared!")
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET a User's Cart
router.get("/find/:userName", verifyTokenAndAuthorization ,async (req,res) =>{
    try {
        const cart = await Cart.find({ username: req.params.userName })
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;