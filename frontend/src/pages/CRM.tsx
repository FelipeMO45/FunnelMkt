import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import DBHeader from "../components/DashboardHeader";
import { FaPlus, FaList, FaFilter } from "react-icons/fa";

// Definir la interfaz de un contacto
interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  task: string;
  location?: string;
  interests?: string[];
  purchaseBehavior?: string;
}

const CRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const contactsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    task: "",
    location: "",
    interests: "",
    purchaseBehavior: "",
  });

  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  const tabs = [
    { label: "Crear", icon: <FaPlus /> },
    { label: "Lista", icon: <FaList /> },
    { label: "Segmentar", icon: <FaFilter /> },
  ];

  const handleTabChange = (index: number) => setActiveTab(index);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: Contact = {
      ...formData,
      id: Date.now(),
      interests: formData.interests.split(",").map((i) => i.trim()),
    };
    setContacts([...contacts, newContact]);
    setFormData({ name: "", email: "", phone: "", notes: "", task: "", location: "", interests: "", purchaseBehavior: "" });
  };

  const filteredContactsList = contacts.filter((contact) =>
    [contact.name, contact.email, contact.phone].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContactsList.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSegmentContacts = () => {
    const { location, interests, purchaseBehavior } = formData;
    setFilteredContacts(
      contacts.filter((c) =>
        (!location || c.location?.includes(location)) &&
        (!interests || c.interests?.some((i) => i.toLowerCase().includes(interests.toLowerCase()))) &&
        (!purchaseBehavior || c.purchaseBehavior?.toLowerCase().includes(purchaseBehavior.toLowerCase()))
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DBHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">CRM</h1>
          <p className="text-gray-500">Gestiona a tus clientes y sus interacciones.</p>

          {/* Tabs */}
          <div className="mt-4 flex space-x-2 border-b border-gray-300">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`flex items-center gap-2 py-2 px-4 text-sm font-semibold transition-all ${
                  activeTab === index ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => handleTabChange(index)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Contenido de las pestañas */}
          <div className="mt-4">
            {/* Crear Contacto */}
            {activeTab === 0 && (
              <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded-lg shadow">
                {["name", "email", "phone", "task", "location", "interests", "purchaseBehavior"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleInputChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ))}
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Notas adicionales"
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                  Crear Contacto
                </button>
              </form>
            )}

            {/* Lista de Contactos */}
            {activeTab === 1 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 border rounded-lg w-full mb-4"
                  placeholder="Buscar por nombre, teléfono o correo"
                />

                {currentContacts.length ? (
                  currentContacts.map((c) => (
                    <div key={c.id} className="p-4 border-b last:border-none">
                      <h3 className="text-lg font-semibold">{c.name}</h3>
                      <p className="text-gray-500">{c.email} - {c.phone}</p>
                      <p className="text-sm text-gray-600">{c.notes}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No hay contactos registrados.</p>
                )}

                {filteredContactsList.length > contactsPerPage && (
                  <div className="mt-4 flex justify-center space-x-2">
                    {Array.from({ length: Math.ceil(filteredContactsList.length / contactsPerPage) }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Segmentación */}
            {activeTab === 2 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Segmentar Contactos</h2>
                <div className="grid gap-4 mt-4">
                  {["location", "interests", "purchaseBehavior"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleInputChange}
                      placeholder={`Filtrar por ${field}`}
                      className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  ))}
                  <button onClick={handleSegmentContacts} className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                    Segmentar
                  </button>
                </div>

                {/* Mostrar contactos segmentados */}
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((c) => (
                    <div key={c.id} className="p-4 border-b last:border-none">
                      <h3 className="text-lg font-semibold">{c.name}</h3>
                      <p className="text-gray-500">{c.email} - {c.phone}</p>
                      <p className="text-sm text-gray-600">{c.notes}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No hay contactos segmentados.</p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CRM;
