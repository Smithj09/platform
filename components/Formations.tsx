import React, { useState, useEffect } from 'react';
import { Formation } from '../types';
import { formationsService } from '../services/formationsService';
import { useAuth } from '../context/AuthContext';

const Formations: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('Tous');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [enrolledFormations, setEnrolledFormations] = useState<string[]>([]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [enrollmentForm, setEnrollmentForm] = useState({
    phone: '',
    company: '',
    experience: '',
  });

  // Debug log
  console.log('Formations component mounted, loaded formations:', formations.length);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadFormations();
    loadEnrolledFormations();
  }, []);

  const loadFormations = () => {
    const data = formationsService.getAllFormations();
    setFormations(data);
  };

  const loadEnrolledFormations = () => {
    const enrolled = localStorage.getItem('enrolledFormations') || '[]';
    try {
      setEnrolledFormations(JSON.parse(enrolled));
    } catch {
      setEnrolledFormations([]);
    }
  };

  const handleEnroll = (formationId: string) => {
    if (!isAuthenticated) {
      alert('Veuillez vous connecter pour vous inscrire à une formation');
      window.location.hash = '#/login';
      return;
    }

    const formation = formationsService.getFormationById(formationId);
    if (!formation) return;

    if (formation.enrolled >= formation.capacity) {
      alert('Cette formation est complète');
      return;
    }

    if (enrolledFormations.includes(formationId)) {
      // Unenroll
      formationsService.unenrollFromFormation(formationId);
      setEnrolledFormations(enrolledFormations.filter(id => id !== formationId));
      loadFormations();
      alert('Vous avez été retiré de cette formation');
    } else {
      // Open enrollment modal
      setSelectedFormation(formation);
      setShowEnrollModal(true);
      setEnrollmentForm({ phone: '', company: '', experience: '' });
    }
  };

  const handleConfirmEnrollment = () => {
    if (!selectedFormation) return;

    // Validation
    if (!enrollmentForm.phone.trim()) {
      alert('Veuillez entrer votre numéro de téléphone');
      return;
    }
    if (!enrollmentForm.company.trim()) {
      alert('Veuillez entrer le nom de votre entreprise');
      return;
    }
    if (!enrollmentForm.experience.trim()) {
      alert('Veuillez sélectionner votre niveau d\'expérience');
      return;
    }

    // Process enrollment
    if (formationsService.enrollInFormation(selectedFormation.id)) {
      setEnrolledFormations([...enrolledFormations, selectedFormation.id]);
      
      // Save enrollment details to localStorage
      const enrollmentDetails = {
        formationId: selectedFormation.id,
        formationTitle: selectedFormation.title,
        phone: enrollmentForm.phone,
        company: enrollmentForm.company,
        experience: enrollmentForm.experience,
        enrolledAt: new Date().toISOString(),
      };
      
      const existingEnrollments = JSON.parse(localStorage.getItem('enrollmentDetails') || '[]');
      existingEnrollments.push(enrollmentDetails);
      localStorage.setItem('enrollmentDetails', JSON.stringify(existingEnrollments));

      alert(`Félicitations! Vous êtes inscrit à ${selectedFormation.title}`);
      setShowEnrollModal(false);
      setSelectedFormation(null);
      loadFormations();
    }
  };

  const filteredFormations = formations.filter(f => {
    const levelMatch = selectedLevel === 'Tous' || f.level === selectedLevel;
    const categoryMatch = selectedCategory === 'Tous' || f.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
  const categories = ['Installation', 'Maintenance', 'Audit'];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-[#0D3156] mb-2">Nos Formations</h1>
          <p className="text-gray-600 text-lg">Développez vos compétences avec nos formations professionnelles en énergie solaire</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Level Filter */}
          <div>
            <label className="block font-bold text-[#0D3156] mb-3">Niveau</label>
            <div className="flex flex-wrap gap-2">
              {['Tous', ...levels].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    selectedLevel === level
                      ? 'bg-[#FFC600] text-[#0D3156]'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FFC600]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block font-bold text-[#0D3156] mb-3">Catégorie</label>
            <div className="flex flex-wrap gap-2">
              {['Tous', ...categories].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    selectedCategory === category
                      ? 'bg-[#FFC600] text-[#0D3156]'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FFC600]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredFormations.length > 0 ? (
            filteredFormations.map(formation => (
              <div
                key={formation.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                {/* Formation Header */}
                <div className="bg-gradient-to-r from-[#0D3156] to-[#1a457a] p-6 text-white">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black">{formation.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      formation.level === 'Débutant'
                        ? 'bg-green-100 text-green-800'
                        : formation.level === 'Intermédiaire'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {formation.level}
                    </span>
                  </div>
                  <span className="inline-block bg-[#FFC600] text-[#0D3156] px-3 py-1 rounded-full text-xs font-bold">
                    {formation.category}
                  </span>
                </div>

                {/* Formation Body */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{formation.description}</p>

                  {/* Details */}
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-calendar text-[#FFC600] w-4"></i>
                      <span className="font-bold text-gray-700">{new Date(formation.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-clock text-[#FFC600] w-4"></i>
                      <span className="text-gray-600">{formation.time} - {formation.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-location-dot text-[#FFC600] w-4"></i>
                      <span className="text-gray-600">{formation.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-person text-[#FFC600] w-4"></i>
                      <span className="text-gray-600">{formation.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-users text-[#FFC600] w-4"></i>
                      <span className="text-gray-600">
                        {formation.enrolled}/{formation.capacity} inscrits
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#FFC600] h-2 rounded-full"
                        style={{ width: `${(formation.enrolled / formation.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-[#0D3156]">${formation.price}</span>
                    <button
                      onClick={() => handleEnroll(formation.id)}
                      disabled={!isAuthenticated && !enrolledFormations.includes(formation.id)}
                      className={`px-6 py-2 rounded-lg font-bold transition-all ${
                        enrolledFormations.includes(formation.id)
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : formation.enrolled >= formation.capacity
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-[#FFC600] text-[#0D3156] hover:scale-105'
                      }`}
                    >
                      {enrolledFormations.includes(formation.id)
                        ? 'Se retirer'
                        : formation.enrolled >= formation.capacity
                        ? 'Complet'
                        : "S'inscrire"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">Aucune formation trouvée pour ces filtres</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-[#0D3156] text-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">À propos de nos formations</h2>
          <p className="mb-4">Nos formations sont conçues pour vous donner les compétences essentielles dans le domaine de l'énergie solaire. Chaque formation est dirigée par des professionnels expérimentés avec des années de terrain.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <i className="fa-solid fa-certificate text-[#FFC600] text-2xl mb-2"></i>
              <h3 className="font-bold mb-2">Certification</h3>
              <p className="text-sm">Obtenez une certification reconnue à la fin de chaque formation</p>
            </div>
            <div>
              <i className="fa-solid fa-hands-helping text-[#FFC600] text-2xl mb-2"></i>
              <h3 className="font-bold mb-2">Support Personnel</h3>
              <p className="text-sm">Bénéficiez d'un soutien personnalisé de nos instructeurs</p>
            </div>
            <div>
              <i className="fa-solid fa-chart-line text-[#FFC600] text-2xl mb-2"></i>
              <h3 className="font-bold mb-2">Carrière</h3>
              <p className="text-sm">Développez votre carrière dans le secteur des énergies renouvelables</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {showEnrollModal && selectedFormation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0D3156] to-[#1a457a] text-white p-6 flex justify-between items-center sticky top-0">
              <div>
                <h3 className="text-2xl font-black">Inscription</h3>
                <p className="text-sm opacity-90 mt-1">{selectedFormation.title}</p>
              </div>
              <button
                onClick={() => {
                  setShowEnrollModal(false);
                  setSelectedFormation(null);
                }}
                className="text-2xl hover:opacity-70 transition-opacity"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Formation Details Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-calendar text-[#FFC600] w-4"></i>
                  <span><strong>Date:</strong> {new Date(selectedFormation.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-clock text-[#FFC600] w-4"></i>
                  <span><strong>Durée:</strong> {selectedFormation.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-[#FFC600] w-4"></i>
                  <span><strong>Lieu:</strong> {selectedFormation.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-person text-[#FFC600] w-4"></i>
                  <span><strong>Instructeur:</strong> {selectedFormation.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-tag text-[#FFC600] w-4"></i>
                  <span><strong>Prix:</strong> ${selectedFormation.price}</span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-[#0D3156] mb-2 text-sm">Numéro de Téléphone *</label>
                  <input
                    type="tel"
                    value={enrollmentForm.phone}
                    onChange={(e) => setEnrollmentForm({ ...enrollmentForm, phone: e.target.value })}
                    placeholder="+509 XXXX-XXXX"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FFC600] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0D3156] mb-2 text-sm">Entreprise *</label>
                  <input
                    type="text"
                    value={enrollmentForm.company}
                    onChange={(e) => setEnrollmentForm({ ...enrollmentForm, company: e.target.value })}
                    placeholder="Nom de votre entreprise"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FFC600] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0D3156] mb-2 text-sm">Niveau d'Expérience *</label>
                  <select
                    value={enrollmentForm.experience}
                    onChange={(e) => setEnrollmentForm({ ...enrollmentForm, experience: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FFC600] outline-none transition-all"
                  >
                    <option value="">Sélectionnez votre niveau</option>
                    <option value="Débutant">Débutant - Sans expérience</option>
                    <option value="Intermédiaire">Intermédiaire - 1-3 ans</option>
                    <option value="Avancé">Avancé - 3+ ans</option>
                  </select>
                </div>
              </div>

              {/* Terms */}
              <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                <p>En vous inscrivant, vous acceptez nos conditions de participation et recevrez des confirmations par email.</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => {
                  setShowEnrollModal(false);
                  setSelectedFormation(null);
                }}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmEnrollment}
                className="flex-1 px-4 py-3 bg-[#FFC600] text-[#0D3156] rounded-lg font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
              >
                Confirmer l'Inscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formations;
