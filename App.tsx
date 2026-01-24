
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { useRouter } from './hooks/useNavigate';
import Navbar from './components/Navbar';
import Calculator from './components/Calculator';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminPanel from './components/AdminPanel';
import Formations from './components/Formations';
import Team from './components/Team';
// import Logo from './components/Logo';
'../assets/logo.jpg';

const HomeContent: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-[#FFC600]/30 font-sans">
      {/* Section Hero avec Image de Panneaux Solaires bien visible */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        {/* L'image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-†20" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000')" }}
        ></div>
        
        {/* Overlay sombre pour faire ressortir le texte blanc/jaune */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3156] via-[#0D3156]/70 to-[#0D3156]/30 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          <div className="max-w-3xl py-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFC600] text-[#0D3156] rounded-full text-[11px] font-black mb-10 tracking-[0.2em] uppercase shadow-xl">
              <span className="w-2 h-2 bg-[#0D3156] rounded-full animate-pulse"></span>
              AD Innovation Services Plus
            </div>
            
            <h1 className="text-4xl lg:text-7xl md:text-3xl font-black text-white leading-[1.1] mb-8 drop-shadow-xl">
              INSTALLATION  <br/>
              <span className="text-[#FFC600] md:text-3xl lg:text-7xl">PHOTOVOLTAIQUE</span> <br/>
            
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-xl font-medium drop-shadow-lg">
              Installation, entretien, performance; l'énergie solaire c'est notre métier.
            </p>
            
              <div className="flex flex-col sm:flex-row gap-6">
               <a   className="bg-[#FFC600] text-[#0D3156] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-[#FFC600]/40 flex items-center justify-center gap-3"
                  href="https://galleri-black.vercel.app/"
                   // optional: opens in a new tab
                  rel="noopener noreferrer"
                 
                >
                  Nos réalisations <i className="fa-solid fa-bolt"></i>
                </a>

              <a href="#solutions" className="bg-white/10 backdrop-blur-xl text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center">
                un clic contactez-nous via whatsapp <i className="fa-brands fa-whatsapp text-lg ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>






      {/* Secction Services */}
      <section id="solutions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-[#FFC600] font-black tracking-[0.3em] uppercase text-[10px] mb-4">Domaines d'Excellence</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-[#0D3156] mb-8">Maîtrise Énergétique Totale</h3>
            <p className="text-lg text-[#4A6278]">Nous orchestrons la production et la distribution électrique pour les bâtiments intelligents de demain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: 'fa-solar-panel',
                title: 'Photovoltaïque',
                desc: 'Solutions sur-mesure pour toitures industrielles et résidentielles avec optimisation du rendement en temps réel.',
                color: 'bg-[#0D3156]'
              },
              {
                icon: 'fa-building-shield',
                title: 'Électricité Bâtiment',
                desc: 'Conception et rénovation de colonnes montantes, tableaux divisionnaires et mise aux normes NF C 15-100.',
                color: 'bg-[#FFC600]'
              },
              {
                icon: 'fa-microchip',
                title: 'Audit & Innovation',
                desc: 'Analyses thermographiques et bilans de puissance pour identifier les gisements d\'économies d\'énergie.',
                color: 'bg-[#4A6278]'
              }
            ].map((solution, idx) => (
              <div key={idx} className="group p-10 lg:p-12 rounded-[50px] bg-[#F8FAFC] border border-slate-100 hover:bg-white hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <div className={`w-16 h-16 ${solution.color} rounded-2xl flex items-center justify-center text-white mb-10 group-hover:rotate-6 transition-transform shadow-xl`}>
                  <i className={`fa-solid ${solution.icon} text-2xl ${solution.color === 'bg-[#FFC600]' ? 'text-[#0D3156]' : 'text-white'}`}></i>
                </div>
                <h4 className="text-2xl font-bold text-[#0D3156] mb-6 tracking-tight">{solution.title}</h4>
                <p className="text-[#4A6278] leading-relaxed mb-10 text-base">{solution.desc}</p>
                <div className="flex items-center gap-3 font-black text-[#0D3156] text-[10px] uppercase tracking-widest group-hover:gap-5 transition-all">
                  Consulter l'offre <i className="fa-solid fa-arrow-right text-[#FFC600]"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

               

      {/* Composant Calculateur AI */}
      <Calculator />

      {/* Appel à l'action final */}
      <section className="py-32 bg-[#0D3156] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_107%,#FFC600_0%,transparent_15%)] opacity-30"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
            <h3 className="text-4xl md:text-6xl font-black text-white mb-8">Passez à l'énergie <br/> du futur dès aujourd'hui.</h3>
            <p className="text-white/70 mb-12 max-w-2xl mx-auto text-lg">Plus de 500 installations réussies sous le standard AD Innovation.</p>
            <a href="#contact" className="inline-block bg-[#FFC600] text-[#0D3156] px-16 py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:scale-110 transition-all shadow-2xl shadow-[#FFC600]/40 text-2xl">
                Contactez un Expert
            </a>
        </div>
      </section>





{/* FOOTER */}
      <footer id="contact" className="bg-white text-[#0D3156] py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Company Column */}
            <div className="text-center md:text-left">
              <img 
                src="https://i.postimg.cc/5y2pkLJ9/logo.jpg" 
                alt="AD Innovation Logo" 
                className="h-20 w-auto object-contain mb-6 mx-auto md:mx-0"
              />
              <p className="text-[#4A6278] leading-relaxed text-sm mb-6 font-medium">
                Votre partenaire idéal pour un travail efficace et durable.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map(social => (
                  <a 
                    key={social} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-[#0D3156]/10 flex items-center justify-center text-[#0D3156] hover:bg-[#FFC600] transition-all transform hover:scale-110"
                  >
                    <i className={`fa-brands fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-[#0D3156] font-black uppercase tracking-[0.15em] text-sm mb-8 flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1 h-5 bg-[#FFC600] rounded-full"></span>
                Nos Services
              </h4>
              <ul className="space-y-3 text-sm text-[#4A6278] font-medium">
                <li className="flex gap-3 items-start">
                  <i className="fa-solid fa-check text-[#FFC600] mt-1 flex-shrink-0"></i>
                  <a href="#" className="hover:text-[#FFC600] transition-colors">Consultation et étude technique</a>
                </li>
                <li className="flex gap-3 items-start">
                  <i className="fa-solid fa-check text-[#FFC600] mt-1 flex-shrink-0"></i>
                  <a href="#" className="hover:text-[#FFC600] transition-colors">Évaluation énergétique</a>
                </li>
                <li className="flex gap-3 items-start">
                  <i className="fa-solid fa-check text-[#FFC600] mt-1 flex-shrink-0"></i>
                  <a href="#" className="hover:text-[#FFC600] transition-colors">Installation photovoltaïque complète</a>
                </li>
                <li className="flex gap-3 items-start">
                  <i className="fa-solid fa-check text-[#FFC600] mt-1 flex-shrink-0"></i>
                  <a href="#" className="hover:text-[#FFC600] transition-colors">Diagnostic et maintenance</a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-[#0D3156] font-black uppercase tracking-[0.15em] text-sm mb-8 flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1 h-5 bg-[#FFC600] rounded-full"></span>
                Contactez-Nous
              </h4>
              <div className="space-y-5 text-sm text-[#4A6278] font-medium">
                <div className="flex gap-3 items-start">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#FFC600]/20 flex-shrink-0 mt-0.5">
                    <i className="fa-solid fa-map-pin text-[#FFC600] text-sm"></i>
                  </div>
                  <div>
                    <p className="font-bold text-[#0D3156] text-xs mb-1">Adresse</p>
                    <p className="leading-relaxed">45 Arrondissement Ouanaminthe, Nord-Est HT<br/>Rue Parc Sportif Manquette</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#FFC600]/20 flex-shrink-0">
                    <i className="fa-solid fa-phone text-[#FFC600] text-sm"></i>
                  </div>
                  <a href="tel:+50940768840" className="hover:text-[#FFC600] transition-colors">+509 4076-8840</a>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#FFC600]/20 flex-shrink-0">
                    <i className="fa-solid fa-phone text-[#FFC600] text-sm"></i>
                  </div>
                  <a href="tel:+50938733401" className="hover:text-[#FFC600] transition-colors">+509 3873-3401</a>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#FFC600]/20 flex-shrink-0">
                    <i className="fa-solid fa-envelope text-[#FFC600] text-sm"></i>
                  </div>
                  <a href="mailto:adinnovation01@example.com" className="hover:text-[#FFC600] transition-colors">adinnovation01</a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider with Gradient */}
          <div className="my-12 relative">
            <div className="border-t border-slate-200"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-[#FFC600] rounded-full"></span>
                <span className="w-2 h-2 bg-[#FFC600] rounded-full"></span>
                <span className="w-2 h-2 bg-[#FFC600] rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Bottom Section - Enhanced */}
          <div className="pb-6">
            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <p className="text-xs font-bold text-[#FFC600] mb-2 uppercase tracking-widest">Solutions</p>
                <ul className="space-y-2 text-xs text-[#4A6278]">
                  <li><a href="#" className="hover:text-[#FFC600] transition-colors">Installation</a></li>
                  <li><a href="#" className="hover:text-[#FFC600] transition-colors">Maintenance</a></li>
                </ul>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-[#FFC600] mb-2 uppercase tracking-widest">Formations</p>
                <ul className="space-y-2 text-xs text-[#4A6278]">
                  <li><a href="#/formations" className="hover:text-[#FFC600] transition-colors">Voir Formations</a></li>
                  <li><a href="#/team" className="hover:text-[#FFC600] transition-colors">Notre Équipe</a></li>
                </ul>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-[#FFC600] mb-2 uppercase tracking-widest">Ressources</p>
                <ul className="space-y-2 text-xs text-[#4A6278]">
                  <li><a href="#" className="hover:text-[#FFC600] transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-[#FFC600] transition-colors">Support</a></li>
                </ul>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-[#FFC600] mb-2 uppercase tracking-widest">Légal</p>
                <ul className="space-y-2 text-xs text-[#4A6278]">
                  <li><a href="#" className="hover:text-[#FFC600] transition-colors">Conditions</a></li>
                  <li><a href="#" className="hover:text-[#FFC600] transition-colors">Confidentialité</a></li>
                </ul>
              </div>
            </div>

            {/* Copyright Section */}
            <div className="bg-gradient-to-r from-[#0D3156]/5 to-[#FFC600]/5 rounded-lg px-8 py-6 text-center border border-slate-100">
              <p className="text-xs text-[#4A6278]/80 font-bold tracking-widest uppercase mb-2">
                © {new Date().getFullYear()} AD Innovation Services Plus
              </p>
              <p className="text-xs text-[#FFC600] font-black tracking-widest">
                🚀 Engineering Excellence 🚀
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const { currentRoute } = useRouter();

  const renderView = () => {
    const path = currentRoute.split('?')[0];
    
    switch (path) {
      case '/login':
        return <Login />;
      case '/register':
        return <Register />;
      case '/admin':
        return (
          <ProtectedAdminRoute>
            <AdminPanel />
          </ProtectedAdminRoute>
        );
      case '/dashboard':
        return (
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 pt-24 px-4">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-black text-[#0D3156] mb-8">Tableau de Bord</h1>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <p className="text-gray-600 mb-4">Bienvenue sur votre tableau de bord personnalisé.</p>
                  <ProtectedRoute>
                    <Calculator />
                  </ProtectedRoute>
                </div>
              </div>
            </div>
          </ProtectedRoute>
        );
      case '/formations':
        return <Formations />;
      case '/team':
        return <Team />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <AuthProvider>
      <Navbar />
      {renderView()}
    </AuthProvider>
  );
};

export default App;
