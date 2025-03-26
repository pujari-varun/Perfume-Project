import React,{useEffect,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import ProductList from "./ProductList";

const ProductDetails=()=>{
    const {id}=useParams();
    const [product,setProduct]=useState(null);
    const [loading,setLoading]=useState(null);
    const [error,setError]=useState(null);
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchProduct=async()=>{
            try{
                const response=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`);
                setProduct(response.data);
            }catch(error){
                console.error("Error fetching product:",error);
                setError("Failed to load product details");
            }
            finally {
                setLoading(false);
            }
        } 
        
        fetchProduct();
    },[id]);

    if(loading)return <div>Laoding...</div>
    if(error)return <div>{error}</div>;
    if (!product) return <p>Product not found</p>;

    return (
<>  
        <div className="page">
        <button onClick={()=>navigate(-1)} className="backbtn">
            ← Back
        </button>

        <div className="product-details">
            
            {/* <img src={product.imageUrl} alt={product.name}/> */}
            <img src={product.imageUrl} alt={product.name}/>
            <div className="product-info">
            <h1>{product.name}</h1>
            <p><strong>Description : </strong>{product.description}</p>
            <p><strong>Price : </strong>${product.price}</p>
            <p><strong>Stock : </strong>{product.stock}</p>
            </div>
        </div>
        <div className="Othersproducts">

            <ProductList/>
        </div>
    </div>
</>

    );
};

export default ProductDetails;