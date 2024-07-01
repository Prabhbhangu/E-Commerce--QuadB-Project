import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form.username, form.password, navigate));
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-3 p-2 border rounded-lg"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          className="w-full mb-3 p-2 border rounded-lg"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
          type="submit"
        >
          Login
        </button>
      </form>
      <button
        className="mt-3 text-blue-500"
        onClick={() => navigate("/auth/register")}
      >
        Create an account
      </button>
    </div>
  );
};

export default AuthForm;
