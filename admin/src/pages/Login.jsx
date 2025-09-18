import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useToast } from "./ToastContext";
import Logo from "../images/WebSIteMainLogo.png";
import "./Login.css";
import { toast } from "react-toastify";

export default function Login() {

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin-token")) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const validateEmail = useCallback((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    else if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  }, []);

  const validatePassword = useCallback((value) => {
    if (!value) return "Password is required";
    else if (value.length < 5) return "Password must be at least 5 characters long";
    return "";
  }, []);

  const handleLogin = useCallback(async () => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (emailValidation || passwordValidation) return;

    setLoading(true);

    try {
      
      const response = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "admin" }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Login failed");

      localStorage.setItem("admin-token", data.result.token);
      // showToast({ content: "Welcome back!", type: "success" });
      toast.success("Welcome back!");
      navigate("/admin/dashboard");
    } catch (error) {
      // showToast({ content: error.message, error: true });
      toast.error("Invalid login!");
      setEmailError("Invalid email or password");
      setPasswordError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }, [email, password, navigate, validateEmail, validatePassword, BASE_URL]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left section */}
        <div className="login-left">
          <img src={Logo} alt="Logo" className="login-logo" />
          <h2>Welcome to the Admin Dashboard</h2>
          <p className="subtext">
            Manage Data, Emails, and operations with ease.
          </p>
          <span className="footer-link">www.ankitMandloiWeb.com</span>
        </div>

        {/* Right section */}
        <div className="login-right">
          <h3>Login</h3>
          <form onKeyDown={handleKeyDown}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(validateEmail(e.target.value));
                }}
                placeholder="Enter your email"
                className={emailError ? "error-input" : ""}
              />
              {emailError && <p className="error-text">{emailError}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value));
                  }}
                  placeholder="Enter your password"
                  className={passwordError ? "error-input" : ""}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                </span>
              </div>
              {passwordError && <p className="error-text">{passwordError}</p>}
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="login-button"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
