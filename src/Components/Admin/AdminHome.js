import React, { useEffect, useState } from "react";
import myaxios from "../utils/axios";
import { errorToast, successToast } from "../utils/toast";
import Sidebar from "./Sidebar/Sidebar";

import { MdDelete } from "react-icons/md";

function AdminHome() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState();
  const [seating, setSeating] = useState();

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
      .post("/store", { name, seating })
      .then((response) => {
        if (response.data === "Added Successfully") {
          successToast("Store Created");
          setTimeout(() => {
            window.location = "/admin";
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteStore = (id) => {
    myaxios.delete(`/store/${id}`).then((response) => {
      if (response.data === "Store Deleted") {
        errorToast("Store Deleted");
        setTimeout(() => {
          window.location = "/admin";
        }, 1000);
      }
    });
  };
  const renderStores = stores.map((store) => (
    <tr>
      <td className="px-2 py-1 border border-dark">{store.storeName}</td>
      <td className="px-2 py-1 border border-dark">{store.seating}</td>
      <td className="px-2 py-1 border border-dark text-center">
        <MdDelete onClick={() => deleteStore(store._id)} />
      </td>
    </tr>
  ));
  return (
    <Sidebar>
      <div className="my-5 mx-5 p-4">
        <h5>ADD STORES</h5>
        <form>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Store Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label className="d-block fw-bold my-1">Seating</label>
            <input
              className="form-control"
              type="number"
              name="seating"
              value={seating}
              required
              onChange={(e) => setSeating(e.target.value)}
            />
          </div>
          <button
            className="btn bg-primary text-white fw-bold my-3"
            onClick={(e) => handleSubmit(e)}
          >
            Create Store
          </button>
        </form>

        <table className="border border-dark">
          <thead>
            <tr>
              <th className="px-2 py-1 border border-dark">Store Name</th>
              <th className="px-2 py-1 border border-dark">Seating</th>
              <th className="px-2 py-1 border border-dark">Delete</th>
            </tr>
          </thead>
          <tbody>{renderStores}</tbody>
        </table>
      </div>
    </Sidebar>
  );
}

export default AdminHome;
