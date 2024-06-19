import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Table from "react-bootstrap/Table";
import IconButton from "./components/IconButton";
import JSConfetti from "js-confetti";
import Filter from "./components/Filter";
import ProductsTable from "./components/Table";

function App() {
  const [listInput, setListInput] = useState("");
  const [products, setProducts] = useState([]);
  const filterShop = [];

  const shopRef = useRef();
  const categoryRef = useRef();

  const jsConfetti = new JSConfetti();

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

  const inputChange = (e) => {
    setListInput(e.target.value);
  };

  const addProduct = () => {
    if (listInput.length > 0) {
      const productName = listInput;
      const productId = uuidv4().slice(0, 5);

      const selectedShop = shopRef.current.value;
      const selectedCategory = categoryRef.current.value;

      const newProduct = {
        id: productId,
        name: productName,
        shop: selectedShop,
        category: selectedCategory,
        isBought: true,
      };

      setProducts([...products, newProduct]);

      setListInput("");
      shopRef.current.selectedIndex = 0;
      categoryRef.current.selectedIndex = 0;
    } else {
      alert("Listeyi doldurmadan ekleme yapamazsin.");
    }

    console.log(products);
  };

  useEffect(() => {
    const allPurchased =
      products.length > 0 && products.every((product) => !product.isBought);

    if (allPurchased) {
      jsConfetti.addConfetti();
      alert("Alışveriş Tamamlandı");
    }
  }, [products]);

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
                onChange={inputChange}
                type="text"
                value={listInput}
                className="w-50 mx-2"
                placeholder="Ürün Adı"
              />
              <Form.Select
                className="w-25 "
                defaultValue=""
                ref={shopRef}
              >
                <option disabled value="">
                  Market
                </option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                className="w-25 mx-2"
                aria-label="Default select example"
                defaultValue=""
                ref={categoryRef}
              >
                <option disabled value="">
                  Kategori
                </option>
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

        <Filter
          shops={shops}
          categories={categories}
          products={products}
          setProducts={setProducts}
        />

        <ProductsTable products={products} setProducts={setProducts} />
      </Container>
    </React.Fragment>
  );
}

export default App;
