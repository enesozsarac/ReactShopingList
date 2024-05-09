import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import "../App.css";

function IconButton({ productId, products, setProducts }) {
  const deleteProduct = (e) => {
    console.log(productId);

    setProducts((products) => {
      return products.filter((product) => product.id !== productId);
    });
    e.stopPropagation();
    console.log(products);
  };

  return (
    <div className="icon">
      <FontAwesomeIcon onClick={deleteProduct} icon={faSquareMinus} />
    </div>
  );
}

export default IconButton;
