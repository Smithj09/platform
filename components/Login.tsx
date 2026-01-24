import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../hooks/useNavigate';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D3156] to-[#1a457a] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-black text-[#0D3156] mb-2">Connexion</h1>
          <p className="text-gray-600 mb-8">Accédez à votre compte AD Innovation</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#0D3156] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFC600] focus:ring-2 focus:ring-[#FFC600]/20"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0D3156] mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFC600] focus:ring-2 focus:ring-[#FFC600]/20"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFC600] text-[#0D3156] px-6 py-3 rounded-xl font-black uppercase tracking-wider hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Pas encore de compte?{' '}
              <a
                href="#/register"
                className="text-[#FFC600] font-bold hover:underline"
              >
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
