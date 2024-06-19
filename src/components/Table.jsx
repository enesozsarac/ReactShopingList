import React, { useRef } from "react";
import { Table } from "react-bootstrap";
import IconButton from "./IconButton";

function ProductsTable({ products, setProducts }) {
  const rowRefs = useRef([]);

  const isPurchased = (productId, rowIndex) => {
    setProducts((products) => {
      return products.map((product, index) => {
        if (index === rowIndex) {
          return { ...product, isBought: !product.isBought };
        }
        return product;
      });
    });

    if (rowRefs.current[rowIndex]) {
      rowRefs.current[rowIndex].style.textDecoration = products[rowIndex]
        .isBought
        ? "line-through"
        : "none";
    }
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Ürün Adı</th>
          <th>Market</th>
          <th>Kategori</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr
            ref={(element) => (rowRefs.current[index] = element)}
            key={index}
            onClick={() => isPurchased(product.id, index)}
          >
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.shop}</td>
            <td>{product.category}</td>
            <td>
              <IconButton
                productId={product.id}
                products={products}
                setProducts={setProducts}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductsTable;
