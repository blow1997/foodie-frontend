import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "reactstrap";
import { Router } from "react-router";
import jwt_decode from "jwt-decode";
import myaxios from "../utils/axios";
import { toast } from "react-toastify";
import { successToast, warningToast } from "../utils/toast";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [wallet, setWallet] = useState();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("Please Login");
      setTimeout(() => {
        window.location = "/";
      }, 100);
    }

    const loggedUser = localStorage.getItem("user");
    const decodeUser = jwt_decode(loggedUser);

    console.log(decodeUser.id);
    myaxios
      .post("/getCart", { user: decodeUser.id })
      .then((cart) => {
        setCartData(cart.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeFromCart = (id) => {
    myaxios
      .delete(`/cart/${id}`)
      .then((response) => {
        if (response.data === "Item removed from Cart") {
          successToast(response.data);
          setTimeout(() => {
            window.location = "/cart";
          }, 500);
        } else {
          window.location = "/cart";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderQuantity = (quantity) => {
    const array = [];
    var total = 0;

    if (quantity <= 10) {
      total = quantity;
    } else {
      total = 10;
    }

    for (let i = 1; i <= total; i++) {
      array.push(i);
    }

    return array.map((value) => <option>{value}</option>);
  };

  const handlePrice = (event, cart, price) => {
    event.preventDefault();

    const quantity = event.target.value;
    const productTotal = parseInt(quantity) * price;

    myaxios
      .put("/cart", {
        quantity: quantity,
        cart: cart,
        price: productTotal,
      })
      .then((response) => {
        if (response.data.status === "success") {
          window.location = "/cart";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalBagprice = () => {
    var bagPrice = 0;
    cartData.map((value) => {
      bagPrice += value.price;
    });
    return bagPrice;
  };

  const Order = (productId, storeId, userId, quantity, billvalue) => {
    myaxios
      .post("/order", {
        products: [
          {
            productId: productId,
            quantity: quantity,
          },
        ],
        storeId,
        userId,

        billvalue,
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
            window.location = "/cart";
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

  const renderProducts =
    cartData.length === 0 ? (
      <h1 className="fw-bold text-center fs-4">Your Cart is Empty</h1>
    ) : (
      cartData.map((products, index) => {
        return (
          <Card className="p-3 my-3" key={index}>
            <Row>
              <Col lg={3}></Col>
              <Col lg={9}>
                <div className="d-flex justify-content-between">
                  <h4>{products.product.productName}</h4>
                  <h4
                    style={{
                      color:
                        products.product.category === "veg" ? "green" : "red",
                    }}
                  >
                    {products.product.category}
                  </h4>
                  <h4>&#8377; {products.price}</h4>
                </div>
                <p>
                  <span className="fw-bold">Type</span>
                  <span className="mx-1">:</span>
                  <span>{products.product.type}</span>
                </p>
                <p>
                  <span className="fw-bold">Quantity</span>
                  <span className="mx-1">:</span>
                  <select
                    defaultValue={products.qty}
                    onChange={(e) =>
                      handlePrice(e, products._id, products.product.rate)
                    }
                  >
                    {renderQuantity(products.product.quantity)}
                  </select>
                </p>

                <p>
                  <span className="fw-bold">Varient</span>
                  <span className="mx-1">:</span>
                  <span>{products.product.varient}</span>
                </p>
                <p>
                  <span className="fw-bold">Ingredients</span>
                  <span className="mx-1">:</span>
                  <span>
                    {products.product.ingredients.map((ingredient) => (
                      <span className="mx-1">{ingredient}</span>
                    ))}
                  </span>
                </p>
                <button
                  onClick={() =>
                    Order(
                      products.product._id,
                      products.product.store,
                      products.user._id,
                      products.qty,
                      products.price
                    )
                  }
                  className="btn w-5 mx-1 bg-success text-white"
                >
                  Order
                </button>
                <button
                  onClick={() => removeFromCart(products._id)}
                  className="btn w-5 mx-1 bg-danger text-white"
                >
                  Delete
                </button>
              </Col>
            </Row>
          </Card>
        );
      })
    );

  return (
    <div className="my-5">
      <h1>CART</h1>
      <p>
        <span className="fw-bold">Total Cart Price</span>
        <span className="mx-2">:</span>
        <span>&#8377; {totalBagprice()}</span>
      </p>

      <Row>
        <Col lg={8} className="p-4 border border-0 border-end">
          {" "}
          {renderProducts}
        </Col>
        <Col lg={4}></Col>
      </Row>
    </div>
  );
}

export default Cart;
