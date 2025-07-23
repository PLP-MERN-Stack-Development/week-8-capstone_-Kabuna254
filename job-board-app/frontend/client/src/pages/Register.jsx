import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";

const Register = () => {
  const [role, setRole] = useState("jobseeker");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyEmail: "",
    companyWebsite: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPasteWarning, setShowPasteWarning] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Role-specific validation
    if (role === "jobseeker") {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Valid email is required";
      }
    } else {
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
      if (!formData.companyEmail.trim()) {
        newErrors.companyEmail = "Company email is required";
      } else if (!validateEmail(formData.companyEmail)) {
        newErrors.companyEmail = "Valid company email is required";
      }
      if (formData.companyWebsite && !formData.companyWebsite.match(/^https?:\/\//)) {
        newErrors.companyWebsite = "Website must start with http:// or https://";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSecurityEvent = (e) => {
    e.preventDefault();
    setShowPasteWarning(true);
    setTimeout(() => setShowPasteWarning(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
      
    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      role: role === "jobseeker" ? "seeker" : "employer", // Match backend enum
      email: role === "jobseeker" ? formData.email : formData.companyEmail,
      password: formData.password,
      ...(role === "employer" ? {
        companyName: formData.companyName,
        companyEmail: formData.companyEmail,
        companyWebsite: formData.companyWebsite || undefined
      } : {
        name: formData.name
      })
    };

    try {
      const response = await authService.register(payload);
      if (response.success) {
        navigate("/login", { state: { registrationSuccess: true } });
      } else {
        setSubmitError(response.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setSubmitError(
        err.response?.data?.message || 
        err.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create Your Account
      </h2>

      {submitError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}

      {showPasteWarning && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
          For security, please type your password manually
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Register as: </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        {role === "jobseeker" ? (
          <>
            <div>
              <label className="block text-gray-700 mb-1">Full Name* </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"}`}
                placeholder="John Doe"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email* </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"}`}
                placeholder="your@email.com"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-gray-700 mb-1">Company Name* </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.companyName ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"}`}
                placeholder="Acme Inc."
                required
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Company Email* </label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.companyEmail ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"}`}
                placeholder="contact@company.com"
                required
              />
              {errors.companyEmail && <p className="text-red-500 text-sm mt-1">{errors.companyEmail}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Company Website</label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.companyWebsite ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"}`}
                placeholder="https://company.com"
              />
              {errors.companyWebsite && <p className="text-red-500 text-sm mt-1">{errors.companyWebsite}</p>}
            </div>
          </>
        )}

        <div>
          <label className="block text-gray-700 mb-1">Password* </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onCopy={handleSecurityEvent}
            onPaste={handleSecurityEvent}
            onCut={handleSecurityEvent}
            className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"}`}
            placeholder="At least 8 characters"
            minLength={8}
            required

          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Confirm Password* </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onCopy={handleSecurityEvent}
            onPaste={handleSecurityEvent}
            onCut={handleSecurityEvent}
            className={`w-full p-2 border rounded ${errors.confirmPassword ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"}`}
            placeholder="Re-enter your password"
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded text-white font-medium ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {isSubmitting ? "Registering..." : "Create Account"}
        </button>
      </form>

      <div className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Log in
        </a>
      </div>
    </div>
  );
};

export default Register;