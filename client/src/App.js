import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import ProtectedComponent from "./components/ProtectedComponent";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto p-5">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/auth/login" element={<LoginForm />} />
            <Route path="/auth/register" element={<RegisterForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedComponent>
                  <Dashboard />
                </ProtectedComponent>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Provider>
  );
};

export default App;
