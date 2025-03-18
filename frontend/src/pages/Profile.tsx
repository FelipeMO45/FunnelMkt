import Sidebar from '../components/sidebar';
import DBHeader from '../components/DashboardHeader';
import { useState } from 'react';

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    socialMedia: '',
    industry: '',
    taxId: '',
    description: '',
    logo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Perfil actualizado:', formData);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DBHeader />

        {/* Main */}
        <main className="p-6 flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Perfil de Empresa</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primera columna */}
              <div>
                <label className="block text-gray-600 text-sm font-semibold">Nombre de la Empresa</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold">Ubicación</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Segunda columna */}
              <div>
                <label className="block text-gray-600 text-sm font-semibold">Industria</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold">ID Fiscal</label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold">Sitio Web</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold">Redes Sociales</label>
                <input
                  type="text"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Campo de descripción */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-600 text-sm font-semibold">Descripción de la Empresa</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg h-28 resize-none"
                />
              </div>

              {/* Subida de logo */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-600 text-sm font-semibold">Logo de la Empresa</label>
                <input
                  type="file"
                  name="logo"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Botón */}
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
