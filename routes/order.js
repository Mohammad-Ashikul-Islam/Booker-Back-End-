const router = require("express").Router();
const Order = require("../models/Order");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

//CREATE
router.post("/add", verifyToken, async (req,res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/clear/:orderId", verifyTokenAndAuthorization, async (req,res) =>{
    const orderID = req.params.orderId
    try {
        await Order.deleteOne({_id: orderID})
        res.status(200).json("Order of Cart has been deleted!")
    } catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/update/:orderId", verifyTokenAndAuthorization, async (req,res) =>{
    const orderID = req.params.orderId;
    try {
        await Order.findByIdAndUpdate( orderID, { status: req.body.Status })
        res.status(200).json("Updated Sucessfully");
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET UserOrder
router.get("/find/:userName", verifyTokenAndAuthorization ,async (req,res) =>{
    const UserName = req.params.userName;
    try {
        const orders = await Order.find({ username: UserName })
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET ALL
router.get("/find_all", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;