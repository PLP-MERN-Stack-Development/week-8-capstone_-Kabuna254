import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "@/api/authService";

function Login() {
  const [role, setRole] = useState("seeker");
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loginData = {
        email: credentials.email.toLowerCase().trim(),
        password: credentials.password,
        role
      };

      const response = await authService.login(loginData);
      
      if (response.success) {
        const user = authService.getCurrentUser();
        navigate(user.role === "employer" ? "/employer/dashboard" : "/");
      } else {
        setError(response.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card rounded-lg p-6 shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="role">Login as </Label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full p-2 border rounded mt-1"
            disabled={loading}
          >
            <option value="seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        <div>
          <Label htmlFor="email">
            {role === "employer" ? "Company Email" : "Email "}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={role === "employer" ? "company@example.com" : "you@example.com"}
            value={credentials.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="password">Password </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={credentials.password}
            onChange={handleChange}
            required
            disabled={loading}
            minLength={8}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-2 w-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : "Login"}
        </Button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center text-sm text-gray-600">
          <Link 
            to="/forgot-password" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link 
            to="/register" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;