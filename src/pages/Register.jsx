import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import  API_BASE_URL from "../config";

const schema = yup.object().shape({
  username: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/signup`, data);
      toast.success("Registration successful. Please login.");
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <div className="mb-3">
          <input {...register("username")} placeholder="Name" className={`form-control ${errors.username ? "is-invalid" : ""}`} required />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </div>
        {/* Email Field */}
        <div className="mb-3">
          <input {...register("email")} placeholder="Email" className={`form-control ${errors.email ? "is-invalid" : ""}`} required />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        {/* Password Field */}
        <div className="mb-3">
          <input {...register("password")} type="password" placeholder="Password" className={`form-control ${errors.password ? "is-invalid" : ""}`} required />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
