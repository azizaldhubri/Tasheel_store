 
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard2 from "../Component/Dashboard/ProductCard";
import { Button } from "@mui/material";
import axios from "axios";

// export default function ProductGridPage() {
export default function ElectronicGrid() {
  const { type } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${type}`);         
        const data = await res.json();
        
        setAllProducts(data.products);
        setProducts(data.products.slice(0, 5));
        setVisibleCount(5); 
            setLoading(false);
      } catch (err) {
             setLoading(false);
        console.error("فشل في تحميل المنتجات:", err);
      }
    }

    if (type) {
      fetchProducts();
    }
  }, [type]);

  const handleShowMore = () => {
    const newCount = visibleCount + 5;
    setVisibleCount(newCount);
    setProducts(allProducts.slice(0, newCount));
  };

  return (
    <div className="border text-center">
      <ProductCard2 products={products} loading={loading}/>
      {products.length !== 0 && products.length < allProducts.length && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button variant="contained" onClick={handleShowMore}>
            إظهار المزيد
          </Button>
        </div>
      )}
    </div>
  );
}
