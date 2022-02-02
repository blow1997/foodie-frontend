import React, { useEffect, useState } from "react";
import { Card, Nav, NavItem, NavLink } from "reactstrap";
import myaxios from "../utils/axios";
import Sidebar from "./Sidebar/Sidebar";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState();
  const [status, setStatus] = useState([]);

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
    console.log(id);
    myaxios
      .post("/getstoreorders", { id: id })
      .then((response) => {
        setOrders(response.data);
        setStatus(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOrderStatus = (condition) => {
    var values = [];
    console.log(condition);
    if (condition === "not_delivered") {
      values = orders.filter((order) => order.status === "not_delivered");
      console.log(values);
      setStatus(values);
    } else if (condition === "delivered") {
      values = orders.filter((order) => order.status === "delivered");
      setStatus(values);
    } else {
      values = orders;
      setStatus(values);
    }
  };
  const renderStores = stores.map((value) => (
    <option value={value._id}>{value.storeName}</option>
  ));

  const renderCards = status.map((order) =>
    order.status === "delivered" ? (
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
        <p className="fw-bold text-success">Delivered</p>
      </Card>
    ) : (
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
        <p className="fw-bold text-danger">Not Delivered</p>
      </Card>
    )
  );

  return (
    <Sidebar>
      <div className="my-5 mx-5 p-4">
        <h5>ADD PRODUCTS</h5>
        <div className="d-flex justify-content-between">
          <select
            className="form-control"
            name="store"
            defaultValue={store}
            onChange={(e) => handleOrders(e.target.value)}
            required
          >
            <option></option>
            {renderStores}
          </select>
        </div>
        <Nav className="my-3 " tabs>
          <NavItem>
            <NavLink href="#" onClick={() => handleOrderStatus("all")}>
              {" "}
              All
            </NavLink>
          </NavItem>
          <NavItem>
            {" "}
            <NavLink href="#" onClick={() => handleOrderStatus("delivered")}>
              {" "}
              Delivered
            </NavLink>
          </NavItem>
          <NavItem>
            {" "}
            <NavLink
              href="#"
              onClick={() => handleOrderStatus("not_delivered")}
            >
              {" "}
              Not Delivered
            </NavLink>
          </NavItem>
        </Nav>
        {renderCards}
      </div>
    </Sidebar>
  );
}

export default OrderHistory;
