import Navbar from "./Navbar";

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar className="app-navbar" />
      <main className="app-main">
        <div className="app-container">
          {children}
        </div>
      </main>
      <footer className="app-footer">
        © {new Date().getFullYear()} JobBoard. All rights reserved.
      </footer>
    </div>
  );
}

export default AppLayout;