import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";

const emptyLogin = { email: "", password: "" };
const emptySetup = { currentEmail: "", currentPassword: "", newEmail: "", newPassword: "", confirmPassword: "" };

export default function Login() {
  const { login, updateCredentials, isDefaultCredentials } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("login"); // "login" or "setup"
  const [form, setForm] = useState(emptyLogin);
  const [setup, setSetup] = useState(emptySetup);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const firstInputRef = useRef(null);

  // focus the first input of whichever form is showing
  useEffect(() => {
    firstInputRef.current.focus();
  }, [mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSetupChange = (e) => setSetup({ ...setup, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    setSuccess("");
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }
    if (login(form.email, form.password)) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleSetup = (e) => {
    e.preventDefault();
    const { currentEmail, currentPassword, newEmail, newPassword, confirmPassword } = setup;

    if (!currentEmail || !currentPassword || !newEmail || !newPassword) {
      setError("All fields are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setError("New email is invalid");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (!updateCredentials(currentEmail, currentPassword, newEmail, newPassword)) {
      setError("Current email or password is wrong");
      return;
    }

    setSetup(emptySetup);
    setForm(emptyLogin);
    setMode("login");
    setError("");
    setSuccess("Credentials updated. Please login with your new details.");
  };

  return (
    <Card className="max-w-sm mx-auto">
      {mode === "login" ? (
        <>
          <h1 className="text-2xl font-bold mb-3">Login</h1>
          {location.state?.message && <p className="text-orange-600 mb-2">{location.state.message}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>}
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-3">
            <input ref={firstInputRef} name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="input" />
            <Button type="submit" className="w-full">Login</Button>
          </form>
          {isDefaultCredentials && (
            <p className="text-sm text-gray-500 mt-3">Demo: admin@example.com / admin123</p>
          )}
          <button
            type="button"
            onClick={() => switchMode("setup")}
            className="text-sm text-blue-600 underline mt-3 cursor-pointer"
          >
            Change admin credentials
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-3">Change Credentials</h1>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <form onSubmit={handleSetup} className="space-y-3">
            <input ref={firstInputRef} name="currentEmail" type="email" value={setup.currentEmail} onChange={handleSetupChange} placeholder="Current email" className="input" />
            <input name="currentPassword" type="password" value={setup.currentPassword} onChange={handleSetupChange} placeholder="Current password" className="input" />
            <hr className="border-gray-200 dark:border-gray-700" />
            <input name="newEmail" type="email" value={setup.newEmail} onChange={handleSetupChange} placeholder="New email" className="input" />
            <input name="newPassword" type="password" value={setup.newPassword} onChange={handleSetupChange} placeholder="New password" className="input" />
            <input name="confirmPassword" type="password" value={setup.confirmPassword} onChange={handleSetupChange} placeholder="Confirm new password" className="input" />
            <Button type="submit" className="w-full">Save Credentials</Button>
          </form>
          <button
            type="button"
            onClick={() => switchMode("login")}
            className="text-sm text-blue-600 underline mt-3 cursor-pointer"
          >
            ← Back to login
          </button>
        </>
      )}
    </Card>
  );
}