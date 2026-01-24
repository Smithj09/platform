
// export default Navbar;
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
'../assets/logo.jpg';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { label: 'Services', href: '#solutions' },
    { label: 'Notre Equipe', href: '#pricing' },
    { label: 'Formations', href: '#calculator' },
    { label: 'À Propos', href: '#about' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Height adjusted to h-24 to accommodate your larger logo size */}
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Replacement */}
            <div className="flex-shrink-0 cursor-pointer py-2">
              <img 
                src="https://i.postimg.cc/5y2pkLJ9/logo.jpg" 
                alt="Logo" 
                className="h-20 w-auto object-contain" 
              />
            </div>  
          {/* Menu Desktop - Caché sur Mobile */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-[#4A6278] hover:text-[#0D3156] text-[11px] font-bold tracking-[0.2em] uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-[#4A6278] text-[11px] font-bold">
                  {user?.name}
                </span>
                <button 
                  onClick={logout}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-md"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <a 
                  href="#/login" 
                  className="text-[#4A6278] px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#0D3156] transition-all"
                >
                  Connexion
                </a>
                <a 
                  href="#/register" 
                  className="bg-[#FFC600] text-[#0D3156] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-md"
                >
                  S'inscrire
                </a>
              </div>
            )}
          </div>

          {/* Bouton Mobile */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-[#0D3156] hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC600]/20"
              aria-label="Menu principal"
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Déroulant */}
      <div className={`md:hidden bg-white border-t border-slate-100 transition-all duration-900 ease-in-out overflow-hidden ${isOpen ? 'h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-8 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-4 py-4 text-sm font-bold text-[#0D3156] tracking-widest uppercase hover:bg-slate-50 rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 text-sm font-bold text-[#0D3156] border-t border-slate-100">
                  {user?.name}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-center bg-red-600 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <a
                  href="#/login"
                  className="block w-full text-center text-[#0D3156] px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs border border-[#0D3156] hover:bg-slate-50"
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </a>
                <a
                  href="#/register"
                  className="block w-full text-center bg-[#FFC600] text-[#0D3156] px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs"
                  onClick={() => setIsOpen(false)}
                >
                  S'inscrire
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;