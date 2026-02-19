"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  // Check if input is a mobile number (only digits)
  const isMobile = /^\d+$/.test(inputValue);

  // Validate email format
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);

  // Validate password: 8+ chars, uppercase, lowercase, number, special char (@#!)
  const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!]).{8,}$/.test(password);

  const validate = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!inputValue) {
      newErrors.input = "Email or mobile is required";
    } else if (!isMobile && !isValidEmail) {
      newErrors.input = "Enter a valid email or mobile number";
    } else if (isMobile && inputValue.length < 10) {
      newErrors.input = "Mobile number must be at least 10 digits";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword) {
      newErrors.password = "Password must be 8+ chars with uppercase, lowercase, number, and @#!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Login successful!");
      // Proceed with login (e.g., API call)
    }
  };

  return (
    <div className="wrapper">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="title">Welcome Back 👋</h2>
        <p className="subtitle">Login with Email or Mobile</p>

        <input
          type="text"
          placeholder="Enter Email or Mobile Number"
          className={`input ${errors.input ? "border-red-500" : ""}`}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (errors.input) setErrors((prev) => ({ ...prev, input: "" }));
          }}
        />
        {errors.input && <p className="error">{errors.input}</p>}

        <input
          type="password"
          placeholder="Password"
          className={`input ${errors.password ? "border-red-500" : ""}`}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <div className="row">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>
          <a href="#" className="forgot">
            Forgot Password?
          </a>
        </div>

        <button className="btn" onClick={validate}>
          Login
        </button>

        <div className="divider">or</div>

        <button className="google">
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="signup-text">
          Don’t have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}   