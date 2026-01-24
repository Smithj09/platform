import React from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC600]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0D3156] mb-4">Accès requis</h1>
          <p className="text-gray-600 mb-6">Veuillez vous connecter pour accéder à cette page.</p>
          <a
            href="#/login"
            className="bg-[#FFC600] text-[#0D3156] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
