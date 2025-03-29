import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../config";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, data);
      login(res.data);
      toast.success("Login successful");
      alert("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email Field */}
        <div className="mb-3">
          <input {...register("email")} type="email" placeholder="Email" className={`form-control ${errors.email ? "is-invalid" : ""}`} required />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <input {...register("password")} type="password" placeholder="Password" className={`form-control ${errors.password ? "is-invalid" : ""}`} required />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
