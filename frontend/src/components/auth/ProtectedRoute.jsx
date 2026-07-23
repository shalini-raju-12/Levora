import { Navigate } from "react-router-dom";

// Dummy authentication check - replace with actual auth logic later
const isAuthenticated = true;

function ProtectedRoute({ children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
