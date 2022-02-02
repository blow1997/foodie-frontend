import axios from "../utils/axios";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Modal, ModalBody } from "reactstrap";
import { successToast, warningToast } from "../utils/toast";
import myaxios from "../utils/axios";

function StoreDetails() {
  const { id } = useParams();
  const [store, setStore] = useState({});
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [orderObj, setOrderObj] = useState({});
  const [qty, setQty] = useState([]);
  const [user, setUser] = useState();
  // console.log(storeId, id, "this");

  useEffect(() => {
    // console.log("hai");
    axios
      .get(`/getProductsfromSingleStore/${id}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getStore();
  }, []);

  const getStore = () => {
    console.log("Hello");
    const loggedUser = localStorage.getItem("user");
    const decodeUser = jwt_decode(loggedUser);
    setUser(decodeUser.id);
    myaxios
      .post("/getOne", {
        id,
      })
      .then((response) => {
        console.log(response.data);
        setStore(response.data);
      })
      .catch((err) => console.log(err));
  };

  const addToCart = (product) => {
    console.log(product);
    myaxios
      .post("/cart", { user: user, product: product._id })
      .then((response) => {
        if (response.data === "Added to Cart") {
          successToast(response.data);
          setTimeout(() => {
            window.location = "/cart";
          }, 500);
        } else {
          console.log(response.data);
          setTimeout(() => {
            window.location = "/cart";
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = (quantity, productId, storeId, price) => {
    setModal(!modal);
    renderQuantity(quantity);
    setOrderObj({
      product: productId,
      store: storeId,
      rate: price,
    });
  };

  const renderQuantity = (quantity) => {
    var array = [];
    var total = 0;
    if (quantity >= 10) {
      total = 10;
    } else {
      total = quantity;
    }

    for (let i = 1; i <= total; i++) {
      array.push(i);
    }

    setQty(array);
    console.log(qty);
  };

  const placeOrder = (quantity) => {
    var total = 0;
    total = orderObj.rate * quantity;

    if (!localStorage.getItem("user")) {
      alert("Please Login");
      setTimeout(() => {
        window.location = "/";
      }, 100);
    }

    const loggedUser = localStorage.getItem("user");
    const decodeUser = jwt_decode(loggedUser);

    myaxios
      .post("/order", {
        products: [
          {
            productId: orderObj.product,
            quantity: quantity,
          },
        ],
        storeId: orderObj.store,
        userId: decodeUser.id,
        billvalue: total,
      })
      .then((response) => {
        console.log(response.data);
        if (
          response.data.msg === "insufficient balance" ||
          response.data.msg === "insufficient quantity" ||
          response.data.msg === "There was a problem creating the user."
        ) {
          warningToast(
            "Unable to Place Order.Please check your balance and quantity"
          );
          setTimeout(() => {
            window.location = "/";
          }, 2000);
        } else {
          successToast("successfully order created");
          setTimeout(() => {
            window.location = "/order";
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderProducts = products.map((product) => (
    <Card className="my-4 p-4">
      <Row>
        <Col lg={4}></Col>
        <Col lg={8}>
          <div className="d-flex justify-content-between">
            <h4>{product.productName}</h4>
            <h4 style={{ color: product.category === "veg" ? "green" : "red" }}>
              {product.category}
            </h4>
            <h4>&#8377; {product.rate}</h4>
          </div>
          <p>
            <span className="fw-bold">Type</span>
            <span className="mx-1">:</span>
            <span>{product.type}</span>
          </p>
          <p>
            <span className="fw-bold">Available Quantity</span>
            <span className="mx-1">:</span>
            <span>{product.quantity}</span>
          </p>
          <p>
            <span className="fw-bold">Varient</span>
            <span className="mx-1">:</span>
            <span>{product.varient}</span>
          </p>

          <button
            onClick={() =>
              toggleModal(
                product.quantity,
                product._id,
                product.store,
                product.rate
              )
            }
            className="btn w-5 mx-1 bg-success text-white"
          >
            Order
          </button>
          <button
            onClick={() => addToCart(product)}
            className="btn w-5 mx-1 bg-primary text-white"
          >
            Add to Cart
          </button>
        </Col>
      </Row>
    </Card>
  ));

  return (
    <div>
      <div className="bg-dark p-5">
        <h2 className="text-white text-center">{store.storeName}</h2>
        <div className="d-flex text-white justify-content-between float-start fw-bold fs-4">
          <p className="mx-1">Seating</p>
          <p className="mx-1">:</p>
          <p className="mx-1">{store.seating}</p>
        </div>
        <span className="clearfix"></span>
      </div>
      <div>{renderProducts}</div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <h5>Select Quantity</h5>
          {qty.length === []
            ? () => {
                return <h1>"Out of Stock"</h1>;
              }
            : qty.map((value) => {
                return (
                  <button
                    onClick={() => placeOrder(value)}
                    className="btn mx-1 rounded-full border border-dark"
                  >
                    {value}
                  </button>
                );
              })}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default StoreDetails;
