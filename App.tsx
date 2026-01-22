
import React from 'react';
import Navbar from './components/Navbar';
import Calculator from './components/Calculator';
// import Logo from './components/Logo';
'../assets/logo.jpg';


const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-[#FFC600]/30 font-sans">
      <Navbar />

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
            
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 drop-shadow-xl">
              INSTALLATION  <br/>
              <span className="text-[#FFC600] text-7xl">PHOTOVOLTAIQUE</span> <br/>
            
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-xl font-medium drop-shadow-lg">
              Installation, entretien, performance; l'énergie solaire c'est notre métier.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#calculator" className="bg-[#FFC600] text-[#0D3156] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-[#FFC600]/40 flex items-center justify-center gap-3">
                Nos réalisations<i className="fa-solid fa-bolt"></i>
              </a>
              <a href="#solutions" className="bg-white/10 backdrop-blur-xl text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center">
                un clic contactez-nous via whatsapp <i className="fa-brands fa-whatsapp text-lg ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Solutions */}
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
      {/* Pied de page */}
      <footer id="contact" className="bg-white text-[#0D3156] pt-10 pb-5 overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-10">
            <div className="lg:col-span-1">
             <div className="flex-shrink-0 cursor-pointer  flex items-center justify-center">
                   
            <img 
            src="https://i.postimg.cc/5y2pkLJ9/logo.jpg" 
            alt="Solar Logo" 
            className="h-32 w-auto object-contain" 
          />
          </div>
          
             <div className="flex items-center justify-center">
              <p className="text-[#4A6278] leading-relaxed mb-15 text-base font-medium max-w-xs">
  Votre partenaire ideal pour un travail efficace et durable.g
</p>
             </div>

             <div className="flex items-center justify-center">
               <div className="flex gap-4">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map(social => (
                  <a key={social} href="#" className="w-12 h-12 rounded-2xl bg-[#0D3156]/5 flex items-center justify-center text-[#0D3156] hover:bg-[#FFC600] hover:text-[#0D3156] transition-all">
                    <i className={`fa-brands fa-${social} text-lg`}></i>
                  </a>
                ))}
              </div>

             </div>
         
            </div>
            
            <div>
              <div className="flex items-center justify-center">
                <h4 className="text-[#0D3156] font-black uppercase tracking-[0.2em] text-[10px] mb-10 font-extrabold text-sm underline">Nos Services</h4>
              </div>
              
              <ul className="space-y-4 list-disc text-sm font-bold text-[#4A6278]">
                <li><a href="#" className="hover:text-[#FFC600] transition-colors">Consultation et étude technique des systemes solaires.</a></li>
                <li><a href="#" className="hover:text-[#FFC600] transition-colors">Évaluation de consommation d'énergie électrique et dimensionnement de systeme solaire.</a></li>
                <li><a href="#" className="hover:text-[#FFC600] transition-colors">Installation complete de systeme photovoltaique(Panneau solaire , Regulateur, batterie, Inverter...)</a></li>
                <li><a href="#" className="hover:text-[#FFC600] transition-colors">Services de diagnostic et de prevention des anomalies dans les systemes solaires</a></li>
              </ul>
            </div>

            <div >
              <div className="flex items-center justify-center">
                  <h4 className="text-[#0D3156] font-black uppercase tracking-[0.2em] text-[10px] mb-10 font-extrabold text-sm underline">Contactez-Nous</h4>
              </div>
              <ul className="space-y-6 text-sm font-bold text-[#4A6278]">
                <li className="flex gap-4 items-start leading-relaxed"><i className="fa-solid fa-location-dot text-[#FFC600] mt-1"></i> 45 Arrondissement Ouanaminthe, Nord-Est HT<br/>Rue Parc Sportif Manquette</li>
                <li className="flex gap-4 items-center"><i className="fa-solid fa-phone text-[#FFC600]"></i> +509 4076-8840</li>
                <li className="flex gap-4 items-center"><i className="fa-solid fa-phone text-[#FFC600]"></i> +509 3873-3401</li>
                <li className="flex gap-4 items-center"><i className="fa-solid fa-envelope text-[#FFC600]"></i>adinnovation01</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-1 border-t border-slate-100 text-center text-[10px] text-[#4A6278]/60 font-black tracking-[0.4em] uppercase">
            <p>&copy; {new Date().getFullYear()} AD Innovation Services Plus. Engineering Excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
