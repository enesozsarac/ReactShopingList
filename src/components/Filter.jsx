import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ProductsTable from "./Table";

function Filter({ shops, categories, products, setProducts }) {
  const [filteredName, setFilteredName] = useState("");
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredStatus, setFilteredStatus] = useState([
    "all",
    "bought",
    "notBought",
  ]);

  const inputChange = (e) => {
    setFilteredName(e.target.value);
  };

  const handleRadioChange = (event) => {
    setFilteredStatus(event.target.id);
  };

  const filterShop = products.filter(
    (product) => product.shop === filteredShopId
  );
  const filterCategory = products.filter(
    (product) => product.category === filteredCategoryId
  );
  const filterName = products.filter((product) =>
    product.name.toLowerCase().includes(filteredName.toLowerCase())
  );
  const filterStatus = products.filter(
    (product) =>
      filteredStatus === "all" ||
      (filteredStatus === "bought" && product.isBought) ||
      (filteredStatus === "notBought" && !product.isBought)
  );

  useEffect(() => {
    setProducts((prevProduct) => {
      return filterShop, prevProduct;
    });
    console.log(filterShop, "shop");
    // console.log(filterCategory);
    // console.log(filterName);
    console.log(products);
  }, [filteredCategoryId, filteredShopId, filteredName, filteredStatus]);

  return (
    <div className="mb-5">
      <h5 className="text-center">Filtre</h5>
      <div className="mt-5">
        <Form>
          <div className="d-flex justify-content-center">
            <Form.Select
              className="w-25 "
              aria-label="Default select example"
              value={filteredShopId}
              onChange={(e) => setFilteredShopId(e.target.value)}
            >
              <option disabled value="">
                Market
              </option>
              {shops.map((shop) => (
                <option key={shop.id} value={shop.name}>
                  {shop.name}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              className="w-25 mx-2"
              aria-label="Default select example"
              value={filteredCategoryId}
              onChange={(e) => setFilteredCategoryId(e.target.value)}
            >
              <option disabled value="">
                Kategori
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Select>

            <Form.Check
              inline
              label="Tümü"
              name="group1"
              type={"radio"}
              id={"all"}
              onChange={handleRadioChange}
              checked={filteredStatus === "all"}
            />
            <Form.Check
              inline
              label="Satın Alınanlar"
              name="group1"
              type={"radio"}
              id={"bought"}
              onChange={handleRadioChange}
              checked={filteredStatus === "bought"}
            />
            <Form.Check
              inline
              label="Satın Alınmayanlar"
              name="group1"
              type={"radio"}
              id={"notBought"}
              onChange={handleRadioChange}
              checked={filteredStatus === "notBought"}
            />

            <Form.Control
              onChange={inputChange}
              type="text"
              value={filteredName}
              className="w-50 mx-2"
              placeholder="Ürün Adı"
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Filter;
