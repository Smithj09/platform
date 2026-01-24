import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../hooks/useNavigate';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D3156] to-[#1a457a] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-black text-[#0D3156] mb-2">Inscription</h1>
          <p className="text-gray-600 mb-8">Créez votre compte AD Innovation</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#0D3156] mb-2">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Dupont"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFC600] focus:ring-2 focus:ring-[#FFC600]/20"
                disabled={isLoading}
              />
            </div>

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

            <div>
              <label className="block text-sm font-bold text-[#0D3156] mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? 'Inscription...' : 'S\'inscrire'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Vous avez déjà un compte?{' '}
              <a
                href="#/login"
                className="text-[#FFC600] font-bold hover:underline"
              >
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
