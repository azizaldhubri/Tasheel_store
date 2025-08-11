import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [groceries, setGroceries] = useState([]);
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // تحميل المنتجات مرة واحدة عند بداية تشغيل التطبيق
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setGroceries(data.products.filter((item) => item.category === "groceries"));
        setFragrances(data.products.filter((item) => item.category === "fragrances"));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ groceries, fragrances, loading }}>
      {children}
    </ProductContext.Provider>
  );
}
