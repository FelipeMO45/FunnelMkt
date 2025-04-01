import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import DBHeader from "../components/DashboardHeader";
import { FaPlus, FaList, FaHistory, FaColumns, FaChartBar } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

type Stage = "Lead" | "Contactado" | "Propuesta enviada" | "Cerrado";
type Priority = "Alta Prioridad" | "Media" | "Baja" | "Prioridad especial" | "Requiere atención";



interface Client {
  id: number;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  companySize: "1-10" | "11-50" | "51-200";
  yearsInMarket: number;
  website: string;
  socialMedia: string;
  marketingGoals: string;
  specificGoals: string;
  challenges: string;
  pastMarketingResults: string;
  priority: Priority;
  contactChannels: string[];
  lastInteraction?: string;
  stage: Stage;
}

const CRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    phone: "",
    companyName: "",
    industry: "",
    companySize: "1-10" as "1-10" | "11-50" | "51-200",
    yearsInMarket: "",
    website: "",
    socialMedia: "",
    marketingGoals: "",
    specificGoals: "",
    challenges: "",
    pastMarketingResults: "",
    priority: "Media" as Priority,
    contactChannels: [] as string[],
  });

  const stagesOrder: readonly Stage[] = ["Lead", "Contactado", "Propuesta enviada", "Cerrado"];
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
const clientsPerPage = 10;


  const tabs = [
    { label: "Agregar Cliente", icon: <FaPlus /> },
    { label: "Lista de Clientes", icon: <FaList /> },
    { label: "Interacciones", icon: <FaHistory /> },
    { label: "Pipeline", icon: <FaColumns /> },
    { label: "Estado del Cliente", icon: <FaChartBar /> },
  ];

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedClients = [...clients];
    const draggedClient = updatedClients.find(
      c => c.id === parseInt(result.draggableId)
    );

    if (draggedClient) {
      const destinationStage = stagesOrder[parseInt(result.destination.droppableId)];
      draggedClient.stage = destinationStage;
      setClients(updatedClients);
    }
  };

  const handleTabChange = (index: number) => setActiveTab(index);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      contactChannels: checked
        ? [...prev.contactChannels, value]
        : prev.contactChannels.filter(c => c !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      id: Date.now(),
      ...formData,
      yearsInMarket: parseInt(formData.yearsInMarket) || 0,
      contactChannels: formData.contactChannels,
      lastInteraction: "N/A",
      stage: "Lead",
    };
    setClients([...clients, newClient]);
    setFormData({
      fullName: "",
      role: "",
      email: "",
      phone: "",
      companyName: "",
      industry: "",
      companySize: "1-10",
      yearsInMarket: "",
      website: "",
      socialMedia: "",
      marketingGoals: "",
      specificGoals: "",
      challenges: "",
      pastMarketingResults: "",
      priority: "Media",
      contactChannels: [],
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DBHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">CRM</h1>

          {/* Tabs */}
          <div className="mt-4 flex space-x-2 border-b border-gray-300">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`flex items-center gap-2 py-2 px-4 text-sm font-semibold transition-all ${
                  activeTab === index
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => handleTabChange(index)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Contenido de las pestañas */}
          <div className="mt-4">
            {/* Agregar Cliente */}
            {activeTab === 0 && (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
                {/* Sección 1: Datos del contacto principal */}
                <div className="space-y-4 border-b pb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Datos del contacto principal</h2>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nombre completo"
                    className="p-2 border border-gray-300 rounded-lg w-full"
                    required
                  />
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="Cargo/Rol en la empresa"
                    className="p-2 border border-gray-300 rounded-lg w-full"
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="p-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Teléfono"
                      className="p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Sección 2: Información de la empresa */}
                <div className="space-y-4 border-b pb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Información de la empresa</h2>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Nombre de la PYME"
                    className="p-2 border border-gray-300 rounded-lg w-full"
                    required
                  />
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="Industria/sector"
                    className="p-2 border border-gray-300 rounded-lg w-full"
                    required
                  />
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                  >
                    <option value="1-10">1-10 empleados</option>
                    <option value="11-50">11-50 empleados</option>
                    <option value="51-200">51-200 empleados</option>
                  </select>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="yearsInMarket"
                      value={formData.yearsInMarket}
                      onChange={handleInputChange}
                      placeholder="Años en el mercado"
                      className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="Sitio web"
                      className="p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <input
                    type="text"
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    placeholder="Redes sociales"
                    className="p-2 border border-gray-300 rounded-lg w-full"
                  />
                </div>

                {/* Sección 3: Objetivos de crecimiento */}
                <div className="space-y-4 border-b pb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Objetivos de crecimiento</h2>
                  <textarea
                    name="marketingGoals"
                    value={formData.marketingGoals}
                    onChange={handleInputChange}
                    placeholder="¿Qué busca lograr con el marketing?"
                    className="p-2 border border-gray-300 rounded-lg w-full h-32"
                  />
                  <textarea
                    name="specificGoals"
                    value={formData.specificGoals}
                    onChange={handleInputChange}
                    placeholder="Metas específicas"
                    className="p-2 border border-gray-300 rounded-lg w-full h-32"
                  />
                </div>

                {/* Sección 4: Desafíos actuales */}
                <div className="space-y-4 border-b pb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Desafíos actuales</h2>
                  <textarea
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleInputChange}
                    placeholder="Principales obstáculos para crecer"
                    className="p-2 border border-gray-300 rounded-lg w-full h-32"
                  />
                  <textarea
                    name="pastMarketingResults"
                    value={formData.pastMarketingResults}
                    onChange={handleInputChange}
                    placeholder="Resultados de estrategias anteriores"
                    className="p-2 border border-gray-300 rounded-lg w-full h-32"
                  />
                </div>

                {/* Sección 5: Frecuencia de contacto */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">Frecuencia de contacto</h2>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                  >
                    <option value="Alta Prioridad">🔴 Alta Prioridad</option>
                    <option value="Media">🟡 Media</option>
                    <option value="Baja">🟢 Baja</option>
                    <option value="Prioridad especial">🟣 Prioridad especial</option>
                    <option value="Requiere atención">⚫ Requiere atención</option>
                  </select>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {['Email', 'WhatsApp', 'Llamadas'].map((channel) => (
                      <label key={channel} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={channel}
                          checked={formData.contactChannels.includes(channel)}
                          onChange={handleCheckboxChange}
                          className="form-checkbox h-4 w-4 text-blue-500"
                        />
                        <span className="text-gray-700">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors w-full mt-6"
                >
                  Guardar Cliente
                </button>
              </form>
            )}

            {/* Lista de Clientes con buscador */}
            {activeTab === 1 && (
  <div className="bg-white rounded-lg shadow">
    <div className="p-4 border-b">
      <input
        type="text"
        placeholder="Buscar clientes..."
        className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />
    </div>

    {/* Lista compacta */}
    <div className="divide-y divide-gray-200">
      {clients
        .filter(client =>
          client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.industry.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage)
        .map((client) => (
          <div key={client.id} className="p-3 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Columna 1: Info principal */}
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    client.priority === "Alta Prioridad" ? "bg-red-500" :
                    client.priority === "Media" ? "bg-yellow-500" :
                    client.priority === "Baja" ? "bg-green-500" :
                    "bg-purple-500"
                  }`}></span>
                  <h3 className="text-sm font-semibold truncate">{client.companyName}</h3>
                </div>
                <p className="text-xs text-gray-500 truncate">{client.industry}</p>
              </div>

              {/* Columna 2: Contacto */}
              <div className="col-span-3">
                <p className="text-sm truncate">{client.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{client.role}</p>
              </div>

              {/* Columna 3: Detalles */}
              <div className="col-span-3">
                <div className="flex gap-2 text-xs">
                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                    {client.companySize} empleados
                  </span>
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                    {client.yearsInMarket} años
                  </span>
                </div>
              </div>

              {/* Columna 4: Acciones */}
              <div className="col-span-2 text-right">
                <button className="text-xs text-blue-600 hover:underline"
                onClick={() => setSelectedClient(client)}
               >
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>

    {selectedClient && (
  <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-8">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{selectedClient.companyName}</h2>
            <p className="text-sm text-gray-500 mt-1">{selectedClient.industry}</p>
          </div>
          <button
            onClick={() => setSelectedClient(null)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-3xl text-gray-500 hover:text-gray-700">&times;</span>
          </button>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sección de Contacto */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">📞 Contacto</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="font-medium text-gray-600">Nombre completo</dt>
                  <dd className="text-gray-900">{selectedClient.fullName}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Cargo</dt>
                  <dd className="text-gray-900">{selectedClient.role}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Contacto</dt>
                  <dd className="text-gray-900">{selectedClient.phone}</dd>
                  <dd className="text-blue-600 hover:underline">{selectedClient.email}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Canales preferidos</dt>
                  <dd className="text-gray-900">
                    {selectedClient.contactChannels.join(', ') || 'No especificado'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Sección de Marketing */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-700 mb-3">🎯 Marketing</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-600">Objetivos principales</h4>
                  <p className="text-gray-900 whitespace-pre-line">
                    {selectedClient.marketingGoals || 'No especificado'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-600">Metas específicas</h4>
                  <p className="text-gray-900 whitespace-pre-line">
                    {selectedClient.specificGoals || 'No especificado'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Empresa */}
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700 mb-3">🏢 Empresa</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="font-medium text-gray-600">Tamaño</dt>
                  <dd className="text-gray-900">{selectedClient.companySize} empleados</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Antigüedad</dt>
                  <dd className="text-gray-900">{selectedClient.yearsInMarket} años</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Sitio web</dt>
                  <dd className="text-blue-600 hover:underline">
                    {selectedClient.website || 'No especificado'}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Redes sociales</dt>
                  <dd className="text-gray-900">
                    {selectedClient.socialMedia || 'No especificado'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Sección de Desafíos */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-700 mb-3">🚧 Desafíos</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-600">Dificultades actuales</h4>
                  <p className="text-gray-900 whitespace-pre-line">
                    {selectedClient.challenges || 'No especificado'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-600">Resultados anteriores</h4>
                  <p className="text-gray-900 whitespace-pre-line">
                    {selectedClient.pastMarketingResults || 'No especificado'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="mt-8 border-t pt-6 flex justify-end">
          <button
            onClick={() => setSelectedClient(null)}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
          >
            Cerrar ventana
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    {/* Paginación */}
    <div className="p-4 border-t">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Mostrando {(currentPage - 1) * clientsPerPage + 1} -{' '}
          {Math.min(currentPage * clientsPerPage, clients.length)} de {clients.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage * clientsPerPage >= clients.length}
            className="px-3 py-1 text-sm rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
)}
            {/* Interacciones */}
            {activeTab === 2 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Historial de Interacciones</h2>
                <div className="space-y-4">
                  {clients.map(client => (
                    client.lastInteraction && client.lastInteraction !== "N/A" && (
                      <div key={`${client.id}-interaction`} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{client.companyName}</h3>
                          <span className="text-sm text-gray-500">{client.lastInteraction}</span>
                        </div>
                        <div className="mt-2 text-gray-600">
                          <p>📞 {client.contactChannels.join(", ")}</p>
                          <p>📝 Notas: {client.pastMarketingResults || "Sin notas"}</p>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Pipeline Kanban */}
            {activeTab === 3 && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-4 gap-4">
                  {stagesOrder.map((stage, index) => (
                    <Droppable key={stage} droppableId={String(index)}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="bg-gray-200 p-4 rounded-lg min-h-[200px]"
                        >
                          <h2 className="text-lg font-bold">{stage}</h2>
                          {clients
                            .filter(client => client.stage === stage)
                            .map((client, idx) => (
                              <Draggable
                                key={client.id}
                                draggableId={String(client.id)}
                                index={idx}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-white p-2 rounded-lg shadow mt-2"
                                  >
                                    <h3 className="font-semibold">{client.companyName}</h3>
                                    <p className="text-sm text-gray-500">{client.fullName}</p>
                                    <span className={`text-xs px-1 py-0.5 rounded ${
                                      client.priority === "Alta Prioridad"
                                        ? "bg-red-100 text-red-800"
                                        : client.priority === "Media"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                    }`}>
                                      {client.priority}
                                    </span>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              </DragDropContext>
            )}

            {/* Estado del Cliente */}
            {activeTab === 4 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Alta Prioridad', 'Media', 'Baja', 'Prioridad especial', 'Requiere atención'].map((priority) => (
                    <div key={priority} className="p-4 border rounded-lg">
                      <h3 className="font-semibold flex items-center gap-2">
                        <span className={`inline-block w-3 h-3 rounded-full ${
                          priority === 'Alta Prioridad' ? 'bg-red-500' :
                          priority === 'Media' ? 'bg-yellow-500' :
                          priority === 'Baja' ? 'bg-green-500' :
                          priority === 'Prioridad especial' ?
                          'bg-purple-500' : 'bg-gray-800'
                        }`}></span>
                        {priority}
                      </h3>
                      <p className="text-2xl font-bold mt-2">
                        {clients.filter(c => c.priority === priority).length}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Distribución por Industria</h3>
                    <ul className="mt-2 space-y-2">
                      {Array.from(new Set(clients.map(c => c.industry))).map(industry => (
                        <li key={industry} className="flex justify-between">
                          <span>{industry}</span>
                          <span>{clients.filter(c => c.industry === industry).length}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Clientes Recientes</h3>
                    <ul className="mt-2 space-y-2">
                      {clients.slice(-3).map(client => (
                        <li key={client.id} className="flex justify-between items-center">
                          <span>{client.companyName}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            client.stage === "Lead" ? "bg-blue-100 text-blue-800" :
                            client.stage === "Contactado" ? "bg-yellow-100 text-yellow-800" :
                            client.stage === "Propuesta enviada" ? "bg-purple-100 text-purple-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {client.stage}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 border rounded-lg">
                  <h3 className="font-semibold mb-4">Resumen de Marketing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600">Objetivos Comunes</p>
                      <p className="font-medium mt-1">
                        {clients.filter(c => c.marketingGoals.includes("ventas")).length} buscan aumentar ventas
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600">Principales Desafíos</p>
                      <p className="font-medium mt-1">
                        {clients.filter(c => c.challenges.includes("visibilidad")).length} con problemas de visibilidad
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-600">Canales Preferidos</p>
                      <p className="font-medium mt-1">
                        {clients.filter(c => c.contactChannels.includes("WhatsApp")).length} prefieren WhatsApp
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CRM;