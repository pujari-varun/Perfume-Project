import React from "react";
import { Link } from "react-router-dom";
import "./SearchProducts.css";

const SearchProducts = ({ products }) => {
  return (
    <div className="perfume-products">
      <h1>Perfume Products</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/api/products/${product._id}`}>
                <img src={product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2> 
                <p>Price : ${product.price}</p> 
              </Link>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchProducts;
