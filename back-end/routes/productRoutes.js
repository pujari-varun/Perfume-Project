const express=require("express");
const router=express.Router();
const Product=require("../models/Product");

//create a product
router.post("/",async(req,res)=>{
    try{
        const productname=req.body.name;
        const existingProduct=await Product.findOne({name:productname});
        if(existingProduct){ 
            res.status(409).json({message:"Product already exist"});
        }

        const product=new Product(req.body);
        await product.save();
        res.status(201).send(product);
    }
    catch(error){
        if (error.code === 11000) {
            return res.status(409).json({ message: "Duplicate perfume name. Product already exists" });
        }
        console.error(error);
        res.status(500).send(error);
    }
});

router.get("/",async(req,res)=>{
    try{
        const product=await Product.find();
        res.json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

//get a single product by ID(GET )
router.get("/:id",async(req,res)=>{
    try{
        const product =await Product.findById(req.params.id);
        if(!product)return res.status(404).json({message:"Product not found"});
        res.json(product);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

//Update a product by ID (PUT)
router.put("/:id",async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

//Delete a product by ID
router.delete("/:id",async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.json({message:"Product deleted"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

module.exports=router;