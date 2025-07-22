import { Link } from "react-router-dom";
import DarkModeToggle from "@/components/DarkmodeToggle";

function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="font-bold">
          JobBoard
        </Link>
        <div className="space-x-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <DarkModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
