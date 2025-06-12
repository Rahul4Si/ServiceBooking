import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from "../api/Api";
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/client/login`, {
        email: form.email,
        password: form.password,
      });
      if (response.status === 200) {
        toast.success("Login successful!");
        setTimeout(() => {
            window.location.href = "/";
        }, 5000); // Redirect after 1 second
        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem("userRole", response.data.userRole);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", response.data.userId);
        window.location.href = "/";
        
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-orange-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-orange-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
