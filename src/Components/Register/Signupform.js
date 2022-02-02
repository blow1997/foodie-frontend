import React from "react";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { Card } from "reactstrap";
// import './signup.css'
import axios from "../utils/axios";
import { successToast, errorToast } from "../utils/toast";

const validation = {
  name: "",
  mobileNo: "",
  password: "",
  email: "",
  dept: "",
  regNo: "",
};

const Signupform = ({ onClick }) => {
  const formik = useFormik({
    initialValues: validation,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("/user", { ...values })
        .then((data) => {
          successToast(data.data.status);
        })
        .catch((err) => errorToast(err.data.status));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required(" Name Required"),
      mobileNo: Yup.string()
        .required("Reqired mobile no")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Required"),
      password: Yup.string()
        .min(4, "Too Short!")
        .max(50, "Too Long!")
        .required("This field is required"),
      dept: Yup.string().required(),
      regNo: Yup.string()
        .required("Reg No required")
        .max(15, "Must be 15 characters or less"),
    }),
  });
  return (
    <div>
      <h4 className="my-1 text-center">Register</h4>
      <form
        className="text-start login_form my-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="field_container">
          <label>Username</label>
          <input
            type="text"
            name="name"
            className={`form-control ${
              formik.errors.name ? "is-invalid" : null
            }`}
            placeholder="Enter Your name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <div className="invalid-feedback">{formik.errors.name}</div>
        </div>
        {/* ------------register number-------- */}
        <div className="field_container">
          <label>Register number</label>
          <input
            type="text"
            name="regNo"
            className={`form-control ${
              formik.errors.regNo ? "is-invalid" : null
            }`}
            placeholder="Enter Your Register No"
            id="regNo"
            onChange={formik.handleChange}
            value={formik.values.regNo}
          />
          <div className="invalid-feedback">{formik.errors.regNo}</div>
        </div>
        {/* ------------mobile number-------- */}
        <div className="field_container">
          <label>Mobile number</label>
          <input
            type="text"
            name="mobileNo"
            className={`form-control ${
              formik.errors.mobileNo ? "is-invalid" : null
            }`}
            placeholder="Enter Your mobileNumber"
            id="MobileNo"
            onChange={formik.handleChange}
            value={formik.values.mobileNo}
          />
          <div className="invalid-feedback">{formik.errors.mobileNo}</div>
        </div>
        {/* ---------------email--------- */}
        <div className="field_container">
          <label>Email</label>
          <input
            type="email"
            className={`form-control ${
              formik.errors.email ? "is-invalid" : null
            }`}
            placeholder="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="invalid-feedback">{formik.errors.email}</div>
        </div>
        {/* ----------------password------------ */}
        <div className="field_container">
          <label>Password</label>
          <input
            type="password"
            className={`form-control ${
              formik.errors.password ? "is-invalid" : null
            }`}
            placeholder="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className="invalid-feedback">{formik.errors.password}</div>
        </div>
        {/* ------------------dept--------------- */}
        <div className="field_container">
          <label>Dept</label>
          <input
            type="text"
            name="dept"
            className={`form-control ${
              formik.errors.dept ? "is-invalid" : null
            }`}
            placeholder="Enter Your dept"
            id="dept"
            onChange={formik.handleChange}
            value={formik.values.dept}
          />
          <div className="invalid-feedback">{formik.errors.dept}</div>
        </div>
        <div className="text-center my-4">
          <button className="btn btn-warning text-white" type="submit">
            Register
          </button>
          <button onClick={onClick} className="btn btn-light mx-2">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signupform;
