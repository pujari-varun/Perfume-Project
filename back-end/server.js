const express=require("express");

const dotenv=require("dotenv");

const cors=require("cors");

const connectDB=require("./config/db.js");

const productRoutes=require("./routes/productRoutes");

dotenv.config();
const app=express();
const PORT=process.env.PORT || 5000

app.use(cors());
app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
    res.send("API is running");

})

app.use("/api/products",productRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})