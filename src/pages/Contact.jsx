import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          rows="5"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Send Message
        </button>

      </form>

    </div>
  );
}