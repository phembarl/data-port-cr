import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('credrails-user') ?? 'null');

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
