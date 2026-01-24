import { Formation } from '../types';

const FORMATIONS_KEY = 'formations_data';

// Default formations
const defaultFormations: Formation[] = [
  {
    id: '1',
    title: 'Installation Panneau Solaire - Débutant',
    description: 'Apprenez les bases de l\'installation de panneaux solaires. Cette formation couvre les principes fondamentaux, la sécurité et les techniques d\'installation.',
    date: '2026-02-15',
    time: '09:00',
    duration: '3 heures',
    location: 'Ouanaminthe, Siège AD Innovation',
    instructor: 'Jean Pierre (Ingénieur)',
    capacity: 20,
    enrolled: 12,
    level: 'Débutant',
    category: 'Installation',
    price: 50,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Maintenance Système Solaire',
    description: 'Formation sur la maintenance préventive et corrective des systèmes solaires.',
    date: '2026-02-22',
    time: '10:00',
    duration: '2.5 heures',
    location: 'Ouanaminthe, Siège AD Innovation',
    instructor: 'Louis Emmanuel (Technicien)',
    capacity: 15,
    enrolled: 8,
    level: 'Intermédiaire',
    category: 'Maintenance',
    price: 40,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Audit Énergétique Avancé',
    description: 'Formation avancée sur l\'audit énergétique et l\'optimisation des systèmes.',
    date: '2026-03-01',
    time: '14:00',
    duration: '4 heures',
    location: 'Ouanaminthe, Siège AD Innovation',
    instructor: 'Marie Claire (Gestion de Projet)',
    capacity: 12,
    enrolled: 11,
    level: 'Avancé',
    category: 'Audit',
    price: 75,
    createdAt: new Date().toISOString(),
  },
];

export const formationsService = {
  // Get all formations
  getAllFormations: (): Formation[] => {
    try {
      const stored = localStorage.getItem(FORMATIONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with default formations
      localStorage.setItem(FORMATIONS_KEY, JSON.stringify(defaultFormations));
      return defaultFormations;
    } catch (error) {
      console.error('Error getting formations:', error);
      return defaultFormations;
    }
  },

  // Add new formation
  addFormation: (formation: Omit<Formation, 'id' | 'createdAt'>): Formation => {
    const formations = formationsService.getAllFormations();
    const newFormation: Formation = {
      ...formation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    formations.push(newFormation);
    localStorage.setItem(FORMATIONS_KEY, JSON.stringify(formations));
    return newFormation;
  },

  // Update formation
  updateFormation: (id: string, updates: Partial<Formation>): Formation | null => {
    const formations = formationsService.getAllFormations();
    const index = formations.findIndex(f => f.id === id);
    if (index !== -1) {
      formations[index] = { ...formations[index], ...updates };
      localStorage.setItem(FORMATIONS_KEY, JSON.stringify(formations));
      return formations[index];
    }
    return null;
  },

  // Delete formation
  deleteFormation: (id: string): boolean => {
    const formations = formationsService.getAllFormations();
    const index = formations.findIndex(f => f.id === id);
    if (index !== -1) {
      formations.splice(index, 1);
      localStorage.setItem(FORMATIONS_KEY, JSON.stringify(formations));
      return true;
    }
    return false;
  },

  // Get formation by id
  getFormationById: (id: string): Formation | null => {
    const formations = formationsService.getAllFormations();
    return formations.find(f => f.id === id) || null;
  },

  // Enroll user in formation
  enrollInFormation: (id: string): boolean => {
    const formation = formationsService.getFormationById(id);
    if (formation && formation.enrolled < formation.capacity) {
      return formationsService.updateFormation(id, {
        enrolled: formation.enrolled + 1,
      }) !== null;
    }
    return false;
  },

  // Unenroll user from formation
  unenrollFromFormation: (id: string): boolean => {
    const formation = formationsService.getFormationById(id);
    if (formation && formation.enrolled > 0) {
      return formationsService.updateFormation(id, {
        enrolled: formation.enrolled - 1,
      }) !== null;
    }
    return false;
  },
};
