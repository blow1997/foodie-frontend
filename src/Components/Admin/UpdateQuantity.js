import React, { useEffect, useState } from "react";
import { GiDoorHandle } from "react-icons/gi";
import { successToast, warningToast } from "../utils/toast";
import myaxios from "../utils/axios";
import Sidebar from "./Sidebar/Sidebar";

function UpdateQuantity() {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState();
  const [product, setProduct] = useState();
  const [qty, setQty] = useState();

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

  const handleProducts = (store) => {
    console.log(store);
    setStore(store);
    myaxios
      .post("/getProductsbyStore", { id: store })
      .then((response) => {
        if (response.data.msg === "products fetched successfully") {
          setProducts(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuantity = (product) => {
    console.log(product);
    setProduct(product);
    myaxios
      .post("/singleProduct", { id: product, store: store })
      .then((response) => {
        if (response.data.msg === "product fetched successfully") {
          var value = response.data.data;
          setQty(value[0].quantity);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    myaxios
      .put("/product", { id: product, quantity: qty })
      .then((response) => {
        if (response.data === "Quantity Updated") {
          successToast("Quantity Updated");
          setTimeout(() => {
            window.location = "/admin/updatequantity";
          }, 1000);
        } else {
          warningToast("Problem in creating Quantity.Try again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderStores = stores.map((value) => (
    <option value={value._id}>{value.storeName}</option>
  ));

  const renderProducts = products.map((value) => (
    <option value={value._id}>{value.productName}</option>
  ));
  return (
    <Sidebar>
      <div className="my-5 mx-5 p-4">
        <h5>UPDATE QUANTITY</h5>
        <form>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Store Name</label>
            <select
              className="form-control"
              name="store"
              defaultValue={store}
              onChange={(e) => handleProducts(e.target.value)}
              required
            >
              {renderStores}
            </select>
          </div>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Product</label>
            <select
              className="form-control"
              name="product"
              defaultValue={product}
              onChange={(e) => handleQuantity(e.target.value)}
              required
            >
              <option></option>
              {renderProducts}
            </select>
            <div className="my-3">
              <label className="d-block fw-bold my-1">Quantity</label>
              <input
                className="form-control"
                type="text"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                name="quantity"
                required
              />
            </div>
          </div>
          <button
            className="btn bg-primary text-white fw-bold my-3"
            onClick={(e) => handleSubmit(e)}
          >
            Update Quantity
          </button>
        </form>
      </div>
    </Sidebar>
  );
}

export default UpdateQuantity;
