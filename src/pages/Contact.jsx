import { useState, useRef, useEffect } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

const emptyForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Email is invalid";
    if (!form.subject.trim()) err.subject = "Subject is required";
    if (form.message.trim().length < 10) err.message = "Message must be at least 10 characters";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setSuccess(true);
      setForm(emptyForm);
    } else {
      setSuccess(false);
    }
  };

  const inputClass = "border p-2 rounded w-full bg-white dark:bg-gray-700";

  return (
    <Card className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-3">Contact Us</h1>
      {success && <p className="text-green-600 mb-3">Message sent successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input ref={nameRef} name="name" value={form.name} onChange={handleChange} placeholder="Name" className={inputClass} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>
        <div>
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>
        <div>
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className={inputClass} />
          {errors.subject && <p className="text-red-600 text-sm">{errors.subject}</p>}
        </div>
        <div>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" rows="4" className={inputClass} />
          {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
        </div>
        <Button type="submit">Send</Button>
      </form>
    </Card>
  );
}