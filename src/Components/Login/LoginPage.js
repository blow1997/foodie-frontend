import React, { useEffect, useState } from "react";
import myaxios from "../utils/axios";
import jwt_decode from "jwt-decode";
import "./loginStyles.css";

function LoginPage({ onClick }) {
  const [mobileNo, setMobileNo] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mobileNo === "" || password === "") {
      alert("Fill out all the fields");
    } else {
      myaxios
        .post("/login", {
          mobileNo: mobileNo,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          if (
            response.data.message === "In correct Password" ||
            response.data.message === "Username not Found"
          ) {
            alert("Incorrect Username or Password");
          } else {
            localStorage.setItem("user", response.data.token);
            const loggedUser = localStorage.getItem("user");
            const decodeUser = jwt_decode(loggedUser);
            localStorage.setItem("role", decodeUser.role);

            if (decodeUser.role === "admin") {
              window.location = "/admin";
            } else {
              window.location = "/";
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <div>
        <h4 className="my-3 text-center">Login</h4>
        <form className="text-start login_form">
          <div className="field_container">
            <label>Mobile Number</label>
            <input
              type="text"
              name="username"
              className="input_field"
              placeholder="Enter Your mobile number"
              value={mobileNo}
              onChange={(e) => {
                setMobileNo(e.target.value);
              }}
            />
          </div>

          <div className="field_container">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="input_field"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center my-4">
            <button
              onClick={(e) => handleSubmit(e)}
              className="btn btn-danger mx-2"
            >
              Submit
            </button>
            <button onClick={onClick} className="btn btn-light mx-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
