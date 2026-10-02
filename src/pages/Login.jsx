import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }
    if (login(form.email, form.password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  const inputClass = "border p-2 rounded w-full bg-white dark:bg-gray-700";

  return (
    <Card className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-3">Login</h1>
      {location.state?.message && <p className="text-orange-600 mb-2">{location.state.message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input ref={emailRef} name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className={inputClass} />
        <Button type="submit" className="w-full">Login</Button>
      </form>
      {/* <p className="text-sm text-gray-500 mt-3">Demo: admin@example.com / admin123</p> */}
    </Card>
  );
}