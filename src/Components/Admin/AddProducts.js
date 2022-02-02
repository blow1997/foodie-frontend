import React, { useEffect, useState } from "react";
import myaxios from "../utils/axios";
import { errorToast, successToast } from "../utils/toast";
import Sidebar from "./Sidebar/Sidebar";

function AddProducts() {
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState();
  const [varient, setVarient] = useState();
  const [type, setType] = useState();
  const [category, setCategory] = useState();
  const [rate, setRate] = useState();

  useEffect(() => {
    myaxios
      .get("/store")
      .then((response) => {
        setStores(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    myaxios
      .post("/product", {
        name: product,
        store: store,
        quantity: quantity,
        type: type,
        varient: varient,
        category: category,
        rate: rate,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.msg === "Product Added") {
          successToast("Product Added");
          setTimeout(() => {
            window.location = "/admin/addproducts";
          }, 1000);
        }

        if (response.data.msg === "problem while creating the product") {
          errorToast("Problem in creating the product");
          setTimeout(() => {
            window.location = "/admin/addproducts";
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderStores = stores.map((value) => (
    <option value={value.storeName}>{value.storeName}</option>
  ));
  return (
    <Sidebar>
      <div className="my-5 mx-5 p-4">
        <h5>ADD PRODUCTS</h5>
        <form>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Store Name</label>
            <select
              className="form-control"
              name="store"
              defaultValue={store}
              onChange={(e) => setStore(e.target.value)}
              required
            >
              <option> </option>
              {renderStores}
            </select>
          </div>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </div>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Type</label>
            <select
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
              name="type"
            >
              <option> </option>
              <option value="Eatables">Eatables</option>
              <option value="drinks">drinks</option>
            </select>
          </div>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Varient</label>
            <input
              type="text"
              value={varient}
              className="form-control"
              onChange={(e) => setVarient(e.target.value)}
              name="varient"
            />
          </div>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
            >
              <option> </option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Rate</label>
            <input
              type="number"
              value={rate}
              className="form-control"
              onChange={(e) => setRate(e.target.value)}
              name="rate"
            />
          </div>
          <button
            className="btn bg-primary text-white fw-bold my-3"
            onClick={(e) => handleSubmit(e)}
          >
            Create Product
          </button>
        </form>
      </div>
    </Sidebar>
  );
}

export default AddProducts;
