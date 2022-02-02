import React from "react";
import { Row, Col } from "reactstrap";

const Sidebar = (props) => {
  return (
    <Row>
      <Col lg={2} className="bg-primary">
        <ul className="text-white list-unstyled p-3">
          <li className="my-2">
            <a
              href="/admin"
              className="text-white text-decoration-none fw-bold"
            >
              Add Store
            </a>
          </li>
          <li className="my-2">
            <a
              href="/admin/addproducts"
              className="text-white text-decoration-none fw-bold"
            >
              Add Products
            </a>
          </li>
          <li className="my-2">
            <a
              href="/admin/updatequantity"
              className="text-white text-decoration-none fw-bold"
            >
              Update Quantity
            </a>
          </li>
          <li className="my-2">
            <a
              href="/admin/updatewallet"
              className="text-white text-decoration-none fw-bold"
            >
              Update Wallet
            </a>
          </li>
          <li className="my-2">
            {" "}
            <a
              href="/admin/orders"
              className="text-white text-decoration-none fw-bold"
            >
              Orders
            </a>
          </li>
          <li className="my-2">
            {" "}
            <a
              href="/admin/orderhistory"
              className="text-white text-decoration-none fw-bold"
            >
              Order History
            </a>
          </li>
        </ul>
      </Col>
      <Col lg={8} className="p-3">
        {props.children}
      </Col>
    </Row>
  );
};

export default Sidebar;
