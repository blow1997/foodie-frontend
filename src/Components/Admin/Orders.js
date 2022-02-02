import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import myaxios from "../utils/axios";
import { infoToast, successToast } from "../utils/toast";
import Sidebar from "./Sidebar/Sidebar";
import { FiSearch } from "react-icons/fi";

function Orders() {
  const [stores, setStores] = useState([]);
  const [orders, setOrders] = useState([]);
  const [store, setStore] = useState();
  const [ordId, setOrdId] = useState();
  const [storeId, setStoreId] = useState();

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

  const handleOrders = (id) => {
    myaxios
      .post("/getstoreorders", { id: id })
      .then((response) => {
        setOrders(response.data);
        setStoreId(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStatus = (event, id) => {
    if (event.target.checked) {
      console.log(id);
      myaxios.put("/order", { id: id }).then((response) => {
        if (response.data === "Order Delivered") {
          successToast("Order Delivered");
          setTimeout(() => {
            window.location = "/admin/orders";
          }, 1000);
        }
      });
    }
  };

  const renderStores = stores.map((value) => (
    <option value={value._id}>{value.storeName}</option>
  ));

  const searchOrder = (event) => {
    var array1 = [];
    array1 = orders.filter((order) => order.orderId == ordId);

    if (array1.length > 0) {
      setOrders(array1);
    } else {
      alert("No such orders");
      setTimeout(() => {
        myaxios
          .post("/getstoreorders", { id: storeId })
          .then((response) => {
            setOrders(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    }
  };

  const renderCards = orders.map((order) =>
    order.status === "not_delivered" ? (
      <Card className="my-2 p-3">
        <p>
          <span className="fw-bold">Order ID</span>
          <span className="mx-1">:</span>
          <span>{order.orderId}</span>
        </p>
        <div className="d-flex justify-content-between">
          <h3>{order.products[0].productId.productName}</h3>
          <h5>&#8377; {order.billvalue}</h5>
        </div>
        <p>
          <span className="fw-bold">Store</span>
          <span className="mx-1">:</span>
          <span>{order.storeId.storeName}</span>
        </p>
        <p>
          <span className="fw-bold">Ordered by</span>
          <span className="mx-1">:</span>
          <span>{order.userId.name}</span>
        </p>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="delivered"
            onClick={(e) => handleStatus(e, order._id)}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Delivered
          </label>
        </div>
      </Card>
    ) : (
      <div></div>
    )
  );
  return (
    <Sidebar>
      <div className="my-5 mx-5 p-4">
        <h5>ORDER DELIVERY</h5>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-between">
            <select
              className="form-control"
              name="store"
              defaultValue={store}
              onChange={(e) => handleOrders(e.target.value)}
              required
            >
              {renderStores}
            </select>
          </div>
          <div>
            <input
              type="number"
              className="form-control"
              placeholder="Search for order id"
              onChange={(e) => setOrdId(e.target.value)}
            />
          </div>
          <div className="p-0">
            <button className="btn my-2" onClick={(e) => searchOrder(e)}>
              <FiSearch size={20} />
            </button>
          </div>
        </div>

        {renderCards}
      </div>
    </Sidebar>
  );
}

export default Orders;
