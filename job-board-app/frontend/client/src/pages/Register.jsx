import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";

const Register = () => {
  const [role, setRole] = useState("jobseeker");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let payload = { role, password };

    if (role === "employer") {
      payload = {
        role,
        password,
        companyName,
        companyEmail,
      };
      if (companyWebsite.trim() !== "") {
        payload.companyWebsite = companyWebsite;
      }
    } else {
      payload = { role, name, email, password };
    }

    try {
      await authService.register(payload);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl mb-4">Register</h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="block w-full mb-4 p-2 border rounded"
        required
      >
        <option value="jobseeker">Register as Jobseeker</option>
        <option value="employer">Register as Employer</option>
      </select>

      {role === "jobseeker" ? (
        <>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
            required
          />
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Company Email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="url"
            placeholder="Company Website (optional)"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
          />
        </>
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-4 p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
