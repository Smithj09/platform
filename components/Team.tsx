import React from 'react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      id: '1',
      name: 'Jean Pierre',
      role: 'Ingénieur en Énergie Solaire',
      expertise: 'Installation & Maintenance',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
      bio: 'Expert avec 15+ ans d\'expérience en installation de systèmes solaires photovoltaïques.',
    },
    {
      id: '2',
      name: 'Marie Dubois',
      role: 'Directrice Technique',
      expertise: 'Performance & Audit',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400',
      bio: 'Spécialiste en optimisation des systèmes solaires et audit énergétique.',
    },
    {
      id: '3',
      name: 'Claude Martin',
      role: 'Responsable Commercial',
      expertise: 'Ventes & Développement',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
      bio: 'Passionné par la promotion des énergies renouvelables et le développement commercial.',
    },
    {
      id: '4',
      name: 'Sophie Laurent',
      role: 'Ingénieure Projet',
      expertise: 'Conception & Planification',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400',
      bio: 'Coordinatrice de projets solaires complexes avec expertise en gestion d\'équipe.',
    },
    {
      id: '5',
      name: 'Patrick Rousseau',
      role: 'Technicien Senior',
      expertise: 'Installation & Dépannage',
      image: 'https://images.unsplash.com/photo-1507539332150-34daaf81b324?auto=format&fit=crop&q=80&w=400&h=400',
      bio: 'Technicien expérimenté en installation et maintenance préventive des systèmes solaires.',
    },
    {
      id: '6',
      name: 'Caroline Lefevre',
      role: 'Responsable Formation',
      expertise: 'Pédagogie & Formation',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400',
      bio: 'Formatrice dévouée à la transmission du savoir-faire en énergie solaire.',
    },
  ];

  const values = [
    {
      icon: 'fa-leaf',
      title: 'Durabilité',
      description: 'Nous nous engageons pour un avenir écologique et durable.',
    },
    {
      icon: 'fa-handshake',
      title: 'Intégrité',
      description: 'Transparence et honnêteté dans tous nos projets et relations.',
    },
    {
      icon: 'fa-lightbulb',
      title: 'Innovation',
      description: 'Nous recherchons constamment de meilleures solutions technologiques.',
    },
    {
      icon: 'fa-users',
      title: 'Collaboration',
      description: 'Travail d\'équipe et partnerships pour réussir ensemble.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D3156] to-[#1a457a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-black mb-4">Notre Équipe</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Découvrez l'équipe d'experts passionnés qui fait fonctionner AD Innovation Services Plus
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-[#0D3156] mb-12 text-center">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <i className={`fa-solid ${value.icon} text-5xl text-[#FFC600] mb-4`}></i>
                <h3 className="font-black text-[#0D3156] mb-3 text-lg">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h2 className="text-4xl font-black text-[#0D3156] mb-12 text-center">Nos Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                {/* Member Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#0D3156] to-[#1a457a]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D3156] via-transparent to-transparent"></div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-black text-[#0D3156] mb-1">{member.name}</h3>
                  <p className="text-[#FFC600] font-bold text-sm mb-2 uppercase tracking-widest">
                    {member.role}
                  </p>
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold mb-4">
                    {member.expertise}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                    <a href="#" className="flex-1 text-center py-2 bg-[#FFC600] text-[#0D3156] rounded-lg font-bold text-xs hover:scale-105 transition-all">
                      <i className="fa-solid fa-envelope"></i> Contact
                    </a>
                    <a href="#" className="flex-1 text-center py-2 border-2 border-[#0D3156] text-[#0D3156] rounded-lg font-bold text-xs hover:bg-gray-50 transition-all">
                      <i className="fa-solid fa-linkedin"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Info Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <i className="fa-solid fa-briefcase text-5xl text-[#FFC600] mb-4"></i>
            <h3 className="text-2xl font-black text-[#0D3156] mb-2">Expérience</h3>
            <p className="text-gray-600">Plus de 50 ans d'expérience combinée en énergie solaire</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <i className="fa-solid fa-star text-5xl text-[#FFC600] mb-4"></i>
            <h3 className="text-2xl font-black text-[#0D3156] mb-2">Certifications</h3>
            <p className="text-gray-600">Tous nos membres sont certifiés par les instances internationales</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <i className="fa-solid fa-handshake text-5xl text-[#FFC600] mb-4"></i>
            <h3 className="text-2xl font-black text-[#0D3156] mb-2">Partenaires</h3>
            <p className="text-gray-600">Travaillons avec les plus grands fabricants mondiaux</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 bg-gradient-to-r from-[#0D3156] to-[#1a457a] text-white rounded-xl p-12 text-center">
          <h2 className="text-4xl font-black mb-4">Rejoignez Notre Équipe</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Nous recherchons des talents passionnés pour nous aider à transformer le secteur des énergies renouvelables.
          </p>
          <a
            href="mailto:jobs@adinnovation.com"
            className="inline-block bg-[#FFC600] text-[#0D3156] px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
          >
            Envoyer Votre CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;
