function AuthLayout({ children }) {
  return (
    <div className="auth-container min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <main className="auth-main">
        <div className="auth-card">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;