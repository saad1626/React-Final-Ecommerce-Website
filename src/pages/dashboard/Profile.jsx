import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useLocalStorage("profile", {
    name: user.name,
    email: user.email,
    bio: "",
  });
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Valid email is required";
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setProfile(form);
      setSaved(true);
    }
  };

  const inputClass = "border p-2 rounded w-full bg-white dark:bg-gray-700";

  return (
    <Card className="max-w-lg">
      <h1 className="text-2xl font-bold mb-1">Profile</h1>
      <p className="mb-3 text-gray-500">Role: {user.role}</p>
      {saved && <p className="text-green-600 mb-2">Profile saved!</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className={inputClass} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>
        <div>
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="About you" rows="3" className={inputClass} />
        <Button type="submit">Save</Button>
      </form>
    </Card>
  );
}