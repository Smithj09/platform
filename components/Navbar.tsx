
// export default Navbar;
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#solutions' },
    { label: 'Audit Solaire', href: '#calculator' },
    { label: 'À Propos', href: '#about' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Height adjusted to h-24 to accommodate your larger logo size */}
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Replacement */}
          <div 
            className="flex-shrink-0 cursor-pointer py-2" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="mb-0"> {/* Changed mb-19 to mb-0 so it stays centered in the navbar */}
              <img 
                src="/logo.jpg" 
                alt="Logo" 
                className="h-20 w-auto object-contain" // Recommended h-20 for visibility, adjust to h-40 if you want it very large
              />
            </div>
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
            <a 
              href="#contact" 
              className="bg-[#0D3156] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#1a457a] transition-all shadow-md"
            >
              Contactez-nous
            </a>
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
      <div className={`md:hidden bg-white border-t border-slate-100 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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
          <div className="pt-4">
            <a
              href="#contact"
              className="block w-full text-center bg-[#0D3156] text-white px-6 py-5 rounded-2xl font-bold shadow-lg uppercase tracking-widest text-xs"
              onClick={() => setIsOpen(false)}
            >
              Obtenir un devis gratuit
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;