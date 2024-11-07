import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}