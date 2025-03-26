import React,{useEffect,useState} from "react";
import axios from "axios";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./ProductList";
import SearchProducts from "./SearchProducts";
import ProductDetails from "./ProductDetails";
import './App.css';

function App() {
  // const [products,setProducts]=useState([]);
  
  // useEffect(()=>{
  //   const fetchProducts=async()=>{
  //     const res=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
  //     setProducts(res.data);
  //   }
  //   fetchProducts();
  // },[]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
      setProducts(res.data);
      setFilteredProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredProducts(products);  // Reset if query is empty
    } 
    else{
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    }
  };

  return (
    
    // <div className="App">
    //   <h1>Perfume Products</h1>
    //   <div className="product-list">
    //     {products.map((product)=>(
    //       <div key={product._id} className="product-card">
    //         <h2>{product.name}</h2> 
    //         <p>{product.description}</p> 
    //         <p>Price : ${product.price}</p> 
    //         <p>Stock : ${product.stock}</p> 
    //       </div>
    //     ))}

    //   </div>
    // </div>
    <Router>
      <Navbar onSearch={handleSearch}/>
        <Routes>
          <Route path="/" element={<SearchProducts products={filteredProducts} />} />
          <Route path="/api/products" element={<ProductList/>}/>
          <Route path="/api/products/:id" element={<ProductDetails/>}/>
        </Routes>
    </Router>
  );
}

export default App;
