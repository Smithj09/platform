import React from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children, fallback }) => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC600]"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0D3156] mb-4">Accès Administrateur Requis</h1>
          <p className="text-gray-600 mb-6">Vous n'avez pas les permissions pour accéder à cette page.</p>
          <a
            href="#/"
            className="bg-[#FFC600] text-[#0D3156] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
