import React, { useState, useEffect } from "react";
import "./Products.css";
import ProductsTable from "../../Components/ProductsTable/ProductsTable";
import AddNewProduct from "../../Components/AddNewProduct/AddNewProduct";

export default function Products() {
  const [allproducts, setAllproducts] = useState([]);
  useEffect(() => {
    getAllproducts();
  }, []);

  const getAllproducts = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/`)
      .then((res) => res.json())
      .then((products) => setAllproducts(products));
  };

  return (
    <div className="new-product-header">
      <AddNewProduct getAllproducts={getAllproducts} />
      <ProductsTable
        allproducts={allproducts.reverse()}
        getAllproducts={getAllproducts}
      />
    </div>
  );
}
