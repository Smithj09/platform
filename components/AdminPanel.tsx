import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin: string;
}

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics' | 'settings'>('overview');
  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@adinnovation.com',
      isAdmin: true,
      createdAt: '2025-01-01',
      lastLogin: '2025-01-25',
    },
  ]);

  const stats = {
    totalUsers: 24,
    totalProjects: 156,
    activeProjects: 42,
    totalRevenue: '$125,450',
  };

  const toggleUserAdmin = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isAdmin: !u.isAdmin } : u
    ));
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-[#0D3156] mb-2">Tableau de Bord Administrateur</h1>
          <p className="text-gray-600">Bienvenue {user?.name}, gère ton application ici.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {(['overview', 'users', 'analytics', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold uppercase tracking-wider text-sm border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-[#FFC600] text-[#0D3156]'
                  : 'border-transparent text-gray-600 hover:text-[#0D3156]'
              }`}
            >
              {tab === 'overview' && '📊 Aperçu'}
              {tab === 'users' && '👥 Utilisateurs'}
              {tab === 'analytics' && '📈 Analytique'}
              {tab === 'settings' && '⚙️ Paramètres'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Utilisateurs Totaux', value: stats.totalUsers, icon: '👥' },
                { label: 'Projets Totaux', value: stats.totalProjects, icon: '📋' },
                { label: 'Projets Actifs', value: stats.activeProjects, icon: '⚡' },
                { label: 'Revenus Totaux', value: stats.totalRevenue, icon: '💰' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-[#0D3156]">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-[#0D3156] mb-6">Activité Récente</h2>
              <div className="space-y-4">
                {[
                  { type: 'user_signup', message: 'Nouvel utilisateur inscrit', time: 'Il y a 2 heures' },
                  { type: 'project_created', message: 'Nouveau projet créé', time: 'Il y a 5 heures' },
                  { type: 'payment', message: 'Paiement reçu', time: 'Il y a 1 jour' },
                  { type: 'user_login', message: 'Utilisateur connecté', time: 'Il y a 1 jour' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                    <div>
                      <p className="font-bold text-[#0D3156]">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <span className="text-2xl">
                      {activity.type === 'user_signup' && '🆕'}
                      {activity.type === 'project_created' && '✨'}
                      {activity.type === 'payment' && '💳'}
                      {activity.type === 'user_login' && '🔓'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0D3156]">Gestion des Utilisateurs</h2>
                <button className="bg-[#FFC600] text-[#0D3156] px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all">
                  + Ajouter Utilisateur
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b-2 border-gray-200">
                    <tr className="text-left">
                      <th className="pb-4 font-black text-[#0D3156]">Nom</th>
                      <th className="pb-4 font-black text-[#0D3156]">Email</th>
                      <th className="pb-4 font-black text-[#0D3156]">Rôle</th>
                      <th className="pb-4 font-black text-[#0D3156]">Inscrit</th>
                      <th className="pb-4 font-black text-[#0D3156]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(usr => (
                      <tr key={usr.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 font-bold text-[#0D3156]">{usr.name}</td>
                        <td className="py-4 text-gray-600">{usr.email}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            usr.isAdmin 
                              ? 'bg-[#FFC600]/20 text-[#0D3156]' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {usr.isAdmin ? 'Admin' : 'Utilisateur'}
                          </span>
                        </td>
                        <td className="py-4 text-gray-600 text-sm">{usr.createdAt}</td>
                        <td className="py-4 space-x-2">
                          <button
                            onClick={() => toggleUserAdmin(usr.id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-bold hover:bg-blue-600"
                          >
                            {usr.isAdmin ? 'Retirer' : 'Admin'}
                          </button>
                          <button
                            onClick={() => deleteUser(usr.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart Placeholder */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-[#0D3156] mb-6">Croissance des Utilisateurs</h2>
                <div className="h-64 bg-gradient-to-b from-[#FFC600]/10 to-transparent rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-600">📈 Graphique de croissance</p>
                    <p className="text-sm text-gray-500 mt-2">+15% ce mois</p>
                  </div>
                </div>
              </div>

              {/* Revenue Chart Placeholder */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-[#0D3156] mb-6">Revenu Mensuel</h2>
                <div className="h-64 bg-gradient-to-b from-[#0D3156]/10 to-transparent rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-600">💰 Graphique de revenu</p>
                    <p className="text-sm text-gray-500 mt-2">+22% ce mois</p>
                  </div>
                </div>
              </div>

              {/* Project Distribution */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-[#0D3156] mb-6">Distribution des Projets</h2>
                <div className="space-y-4">
                  {[
                    { type: 'Photovoltaïque', count: 98, percentage: 65 },
                    { type: 'Audit Énergétique', count: 38, percentage: 25 },
                    { type: 'Maintenance', count: 20, percentage: 10 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <p className="font-bold text-gray-700">{item.type}</p>
                        <p className="text-sm font-bold text-[#0D3156]">{item.count}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#FFC600] h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Services */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-[#0D3156] mb-6">Services Populaires</h2>
                <div className="space-y-3">
                  {[
                    { service: 'Installation Panneau', views: 1240 },
                    { service: 'Consultation', views: 856 },
                    { service: 'Maintenance', views: 643 },
                    { service: 'Audit Technique', views: 521 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                      <p className="font-bold text-gray-700">{item.service}</p>
                      <p className="text-sm font-bold text-[#FFC600]">{item.views} vues</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#0D3156] mb-8">Paramètres d'Application</h2>

            <div className="space-y-8">
              {/* General Settings */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-bold text-[#0D3156] mb-4">⚙️ Paramètres Généraux</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-[#0D3156] mb-2">Nom de l'Application</label>
                    <input 
                      type="text" 
                      defaultValue="AD Innovation Services Plus"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFC600]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D3156] mb-2">Email de Support</label>
                    <input 
                      type="email" 
                      defaultValue="support@adinnovation.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFC600]"
                    />
                  </div>
                </div>
              </div>

              {/* Email Settings */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-bold text-[#0D3156] mb-4">📧 Paramètres Email</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <span className="font-bold text-gray-700">Activer les emails de notification</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <span className="font-bold text-gray-700">Envoyer des rapports hebdomadaires</span>
                  </label>
                </div>
              </div>

              {/* Security */}
              <div className="pb-8">
                <h3 className="text-lg font-bold text-[#0D3156] mb-4">🔒 Sécurité</h3>
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">
                  Réinitialiser Mot de Passe
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-8 border-t border-gray-200">
              <button className="bg-[#FFC600] text-[#0D3156] px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all">
                Enregistrer
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-50">
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
