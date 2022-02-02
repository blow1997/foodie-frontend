import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "reactstrap";
import myaxios from "../utils/axios";
import jwt_decode from "jwt-decode";
import { successToast } from "../utils/toast";

function Order() {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("Please Login");
      setTimeout(() => {
        window.location = "/";
      }, 100);
    }

    const loggedUser = localStorage.getItem("user");
    const decodeUser = jwt_decode(loggedUser);
    console.log(decodeUser);
    myaxios
      .post("/getOrders", { userId: decodeUser.id })
      .then((response) => {
        setOrderData(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteOrder = (id) => {
    myaxios.delete(`/order/${id}`).then((response) => {
      if (response.data === "Order Deleted") {
        successToast("successfully Order Deleted");
        setTimeout(() => {
          window.location = "/order";
        }, 2000);
      }
    });
  };

  const renderOrders = orderData.map((order) => (
    <Card className="p-3 my-2 rounded-0">
      <p>
        <span className="fw-bold">Order Id</span>
        <span className="mx-1">:</span>
        <span> {order.orderId}</span>
      </p>

      <div className="d-flex justify-content-between">
        <h2>{order.products[0].productId.productName}</h2>
        <h5
          className={
            order.products[0].productId.category === "veg"
              ? "text-success"
              : "text-danger"
          }
        >
          {order.products[0].productId.category}
        </h5>
        <h5>&#8377; {order.billvalue}</h5>
      </div>
      <p className="my-1">
        <span className="fw-bold">No.of.quantity</span>
        <span className="mx-1">:</span>
        <span> {order.products[0].quantity}</span>
      </p>
      {/* <p className="my-1">
        <span className="fw-bold">Store </span>
        <span className="mx-1">:</span>
        <span>{order.storeId.seating}</span>
      </p> */}
      <p className="my-1">
        <span className="fw-bold">Ordered by</span>
        <span className="mx-1">:</span>
        <span>{order.userId.name}</span>
      </p>
      <p className="my-1">
        <span className="fw-bold">Product Type</span>
        <span className="mx-1">:</span>
        <span>{order.products[0].productId.type}</span>
      </p>
      <p className="my-1">
        <span className="fw-bold">Varient</span>
        <span className="mx-1">:</span>
        <span>{order.products[0].productId.varient}</span>
      </p>

      <div className="my-2">
        <button
          onClick={() => deleteOrder(order._id)}
          className="btn text-white mx-1 fw-bold w-full  bg-danger"
        >
          Delete Order
        </button>
      </div>
    </Card>
  ));
  return (
    <div>
      <div className="my-5">{renderOrders}</div>
    </div>
  );
}

export default Order;
