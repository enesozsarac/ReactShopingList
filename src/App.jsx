import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Table } from "react-bootstrap";
import { nanoid } from "nanoid";
import IconButton from "./components/IconButton";
import Fuse from "fuse.js";

function App() {
  const [listInput, setListInput] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [filteredName, setFilteredName] = useState("");
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredStatus, setFilteredStatus] = useState([
    "all",
    "bought",
    "notBought",
  ]);

  const shops = [
    {
      id: 1,
      name: "Migros",
    },
    {
      id: 2,
      name: "Teknosa",
    },
    {
      id: 3,
      name: "Bim",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Elektronik",
    },
    {
      id: 2,
      name: "Şarküteri",
    },
    {
      id: 3,
      name: "Oyuncak",
    },
    {
      id: 4,
      name: "Bakliyat",
    },
    {
      id: 5,
      name: "Fırın",
    },
  ];

  const addProduct = () => {
    const productName = listInput;
    const productId = nanoid().slice(0, 5);

    const product = {
      id: productId,
      name: productName,
      shop: selectedShop,
      category: selectedCategory,
    };

    setProducts([...products, product]);
    setListInput("");
  };

  const isPurchased = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, isBought: true };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const searchName = () => {
    const options = {
      keys: ["name"],
    };
    const fuse = new Fuse(products, options);
    const filterSearch = fuse.search(filteredName);

    console.log(filterSearch);
  };

  useEffect(() => {
    const filterShop = products.filter(
      (product) => product.shop == filteredShopId
    );

    console.log(filterShop);

    const filterCategory = products.filter(
      (product) => product.category == filteredCategoryId
    );

    console.log(filterCategory);

    searchName();

    // console.log(filteredStatus);
  }, [filteredShopId, filteredCategoryId, filteredName, filteredStatus]);

  return (
    <React.Fragment>
      <Container>
        <Form>
          <Form.Group className="m-5 text-center ">
            <h5 className="mb-4 font-weight-bold">
              Alışverişte Alınacaklar Listesi
            </h5>
            <div className="d-flex justify-content-center">
              <Form.Control
                onChange={(e) => {
                  setListInput(e.target.value);
                }}
                type="text"
                value={listInput}
                className="w-50 mx-2"
                placeholder="Ürün Adı"
              />
              <Form.Select
                className="w-25"
                onChange={(e) => setSelectedShop(e.target.value)}
              >
                <option>Market</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                className="w-25 mx-2"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
              <Button variant="primary" onClick={addProduct}>
                Ekle
              </Button>
            </div>
          </Form.Group>
        </Form>

        <div className="mb-5">
          <h5 className="text-center mb-5">Filter</h5>
          <Form>
            <div className="d-flex justify-content-center">
              <Form.Select
                className="w-25 "
                value={filteredShopId}
                onChange={(e) => setFilteredShopId(e.target.value)}
              >
                <option>Market</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                className="w-25 mx-2"
                value={filteredCategoryId}
                onChange={(e) => setFilteredCategoryId(e.target.value)}
              >
                <option>Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Check
                inline
                label="Tümü"
                name="group1"
                type={"radio"}
                value={"all"}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              <Form.Check
                inline
                label="Satın Alınanlar"
                name="group1"
                type={"radio"}
                value={"bought"}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              <Form.Check
                inline
                label="Satın Alınmayanlar"
                name="group1"
                type={"radio"}
                value={"notBought"}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />

              <Form.Control
                onChange={(e) => {
                  setFilteredName(e.target.value);
                }}
                value={filteredName}
                type="text"
                className="w-50 mx-2"
                placeholder="Ürün Adı"
              />
            </div>
          </Form>
        </div>

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
            {products.map((product) => (
              <tr
                key={product.id}
                onClick={() => isPurchased(product.id)}
                style={
                  product.isBought ? { textDecoration: "line-through" } : {}
                }
              >
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{shops[product.shop - 1]?.name}</td>
                <td>{categories[product.category - 1]?.name}</td>
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
      </Container>
    </React.Fragment>
  );
}

export default App;
