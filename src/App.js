import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { Redirect } from "react-router";
import { Container } from "reactstrap";
import AdminHome from "./Components/Admin/AdminHome";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/Login/LoginPage";
import Profile from "./Components/profile/profile";
import Update from "./Components/update/Update";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import StoreDetails from "./Components/Stores.js/StoreDetails";
import Footer from "./Components/Footer/Footer";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Order/Order";
import AddProducts from "./Components/Admin/AddProducts";
import UpdateQuantity from "./Components/Admin/UpdateQuantity";
import UpdateWallet from "./Components/Admin/UpdateWallet";
import Orders from "./Components/Admin/Orders";
import OrderHistory from "./Components/Admin/OrderHistory";

function App() {
  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });

  const User = ({ match }) => {};

  const Admin = ({ match }) => {
    // <Routes>
    //   <Route path={`/admin/home`} exact={true} element={<HomePage />} />
    // </Routes>;
  };
  const Store = ({ match }) => {};
  return (
    <div>
      <Router>
        <Header />
        {/* <AdminHeader/> */}
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route exact path="/stores/:id" element={<StoreDetails />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/update" element={<Update />} />
            <Route exact path="/cart" element={<Cart />} />
            {/* <Route exact path="/user" element={<User />} />
           
            <Route exact path="/store" element={<Store />} /> */}
            <Route exact path="/order" element={<Order />} />
            {localStorage.getItem("role") === "admin" ? (
              <>
                <Route exact path="/admin" element={<AdminHome />} />
                <Route
                  exact
                  path="/admin/addproducts"
                  element={<AddProducts />}
                />
                <Route
                  exact
                  path="/admin/updatequantity"
                  element={<UpdateQuantity />}
                />
                <Route
                  exact
                  path="/admin/updatewallet"
                  element={<UpdateWallet />}
                />
                <Route exact path="/admin/orders" element={<Orders />} />
                <Route
                  exact
                  path="/admin/orderhistory"
                  element={<OrderHistory />}
                />
              </>
            ) : (
              <>
                <Route
                  exact={false}
                  path="/admin"
                  element={<Navigate to="/" />}
                />
                <Route
                  exact={false}
                  path="/admin/addproducts"
                  element={<Navigate to="/" />}
                />
                <Route
                  exact={false}
                  path="/admin/updatequantity"
                  element={<Navigate to="/" />}
                />
                <Route
                  exact
                  path="/admin/updatewallet"
                  element={<Navigate to="/" />}
                />

                <Route
                  exact
                  path="/admin/orders"
                  element={<Navigate to="/" />}
                />
                <Route
                  exact
                  path="/admin/orderhistory"
                  element={<Navigate to="/" />}
                />
              </>
            )}
          </Routes>
        </Container>
        <Footer />
      </Router>
      <ToastContainer transition={bounce} />
    </div>
  );
}

export default App;
