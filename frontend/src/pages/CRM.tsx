import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import DBHeader from "../components/DashboardHeader";
import { FaPlus, FaList, FaHistory, FaColumns, FaChartBar } from "react-icons/fa";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

type Stage = "Lead" | "Contactado" | "Propuesta enviada" | "Cerrado";
type contactFrecuency = "Alta Prioridad" | "Media" | "Baja" | "Prioridad especial" | "Requiere atención";

interface Client {
  id: number;
  fullName: string;
  position: string;
  email: string;
  phone: number;
  pymeName: string;
  industry: string;
  employees: "1-10" | "11-50" | "51-200";
  marketYears: number;
  website: string;
  socialNetwork: string;
  generalGoal: string;
  specificGoals: string;
  obtacles: string;
  previousAttempts: string;
  contactFrecuency: contactFrecuency;
  contactMediums: string[];
  lastInteraction?: string;
  stage: Stage;
}

const CRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactMediumError, setContactMediumError] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    email: "",
    phone: "",
    pymeName: "",
    industry: "",
    employees: "1-10" as "1-10" | "11-50" | "51-200",
    marketYears: "",
    website: "",
    socialNetwork: "",
    generalGoal: "",
    specificGoals: "",
    obtacles: "",
    previousAttempts: "",
    contactFrecuency: "Media" as contactFrecuency,
    contactMediums: [] as number[],
  });

  const stagesOrder: readonly Stage[] = ["Lead", "Contactado", "Propuesta enviada", "Cerrado"];
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  const tabs = [
    { label: "Estado del Cliente", icon: <FaChartBar /> },
    { label: "Agregar Cliente", icon: <FaPlus /> },
    { label: "Lista de Clientes", icon: <FaList /> },
    { label: "Interacciones", icon: <FaHistory /> },

  ];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = clients.findIndex(client => client.id === active.id);
      const newIndex = clients.findIndex(client => client.id === over.id);

      const updatedClients = arrayMove(clients, oldIndex, newIndex);
      setClients(updatedClients);
    }
  };

  const handleStageChange = (clientId: number, newStage: Stage) => {
    setClients(clients.map(client =>
      client.id === clientId ? { ...client, stage: newStage } : client
    ));
  };

  const handleTabChange = (index: number) => setActiveTab(index);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const { checked } = e.target;

    setFormData(prev => ({
      ...prev,
      contactMediums: checked
        ? [...prev.contactMediums, value]
        : prev.contactMediums.filter(c => c !== value)
    }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, position, email, phone, pymeName, industry, employees, marketYears, website, socialNetwork, generalGoal, specificGoals, obtacles, previousAttempts } = formData;

    if (formData.contactMediums.length === 0) {
      setContactMediumError(true);
      return;
    }

    setContactMediumError(false);
    
    const newClient = {
      fullName,
      position,
      email,
      phone: parseInt(phone) || 0,
      pymeName,
      industry,
      employees,
      marketYears: parseInt(marketYears) || 0,
      website,
      socialNetwork,
      generalGoal,
      specificGoals,
      obtacles,
      previousAttempts,
    };

    try {
      const response = await fetch("http://localhost:3000/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el cliente en la base de datos");
      }


      const savedClient = await response.json();
      setClients([...clients, savedClient]); // Agregar el cliente guardado a la lista local
      setFormData({
        fullName: "",
        position: "",
        email: "",
        phone: "",
        pymeName: "",
        industry: "",
        employees: "1-10",
        marketYears: "",
        website: "",
        socialNetwork: "",
        generalGoal: "",
        specificGoals: "",
        obtacles: "",
        previousAttempts: "",
        contactFrecuency: "Media",
        contactMediums: [] as number[],
      });
      alert("Cliente registrado exitosamente");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar el cliente. Por favor, inténtalo de nuevo.");
    }
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
                className={`flex items-center gap-2 py-2 px-4 text-sm font-semibold transition-all ${activeTab === index
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
            {activeTab === 1 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grid 2x2 */}
                <div className="grid md:grid-cols-2 md:grid-rows-2 gap-8">

                  {/* Arriba izquierda: Datos del contacto */}
                  <div className="space-y-4 border-b pb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Datos del contacto principal</h2>
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
                      name="position"
                      value={formData.position}
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
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Teléfono"
                        className="p-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  {/* Arriba derecha: Empresa */}
                  <div className="space-y-4 border-b pb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Información de la empresa</h2>
                    <input
                      type="text"
                      name="pymeName"
                      value={formData.pymeName}
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
                      name="employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-lg w-full"
                    >
                      <option value="1">1-10 empleados</option>
                      <option value="2">11-50 empleados</option>
                      <option value="3">51-200 empleados</option>
                    </select>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="number"
                        name="marketYears"
                        value={formData.marketYears}
                        onChange={handleInputChange}
                        placeholder="Años en el mercado"
                        className="p-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="Sitio web"
                        className="p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <input
                      type="text"
                      name="socialNetwork"
                      value={formData.socialNetwork}
                      onChange={handleInputChange}
                      placeholder="Redes sociales"
                      className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                  </div>

                  {/* Abajo izquierda: Objetivos */}
                  <div className="space-y-4 border-b pb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Objetivos de crecimiento</h2>
                    <textarea
                      name="generalGoal"
                      value={formData.generalGoal}
                      onChange={handleInputChange}
                      placeholder="¿Qué busca lograr con el marketing?"
                      className="p-2 border border-gray-300 rounded-lg w-full h-24"
                    />
                    <textarea
                      name="specificGoals"
                      value={formData.specificGoals}
                      onChange={handleInputChange}
                      placeholder="Metas específicas"
                      className="p-2 border border-gray-300 rounded-lg w-full h-24"
                    />
                  </div>

                  {/* Abajo derecha: Desafíos */}
                  <div className="space-y-4 border-b pb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Desafíos actuales</h2>
                    <textarea
                      name="obtacles"
                      value={formData.obtacles}
                      onChange={handleInputChange}
                      placeholder="Principales obstáculos para crecer"
                      className="p-2 border border-gray-300 rounded-lg w-full h-24"
                    />
                    <textarea
                      name="previousAttempts"
                      value={formData.previousAttempts}
                      onChange={handleInputChange}
                      placeholder="Resultados de estrategias anteriores"
                      className="p-2 border border-gray-300 rounded-lg w-full h-24"
                    />
                  </div>
                </div>

                {/* Frecuencia y botón */}
                <div className="space-y-4 border-t pt-6">
                  <h2 className="text-lg font-semibold text-gray-800">Frecuencia de contacto</h2>
                  <select
                    name="contactFrecuency"
                    value={formData.contactFrecuency}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                  >
                    <option value="1">🔴 Alta Prioridad</option>
                    <option value="2">🟡 Media</option>
                    <option value="3">🟢 Baja</option>
                    <option value="4">🟣 Prioridad especial</option>
                    <option value="5">⚫ Requiere atención</option>
                  </select>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {['Email', 'WhatsApp', 'Llamadas'].map((channel, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={index + 1}
                          checked={formData.contactMediums.includes(index + 1)}
                          onChange={handleCheckboxChange}
                          className="form-checkbox h-4 w-4 text-blue-500"
                        />
                        <span className="text-gray-700">{channel}</span>
                      </label>
                    ))}
                  </div>

                  {contactMediumError && (
                    <p className="text-red-500 text-sm mt-1">
                      Selecciona al menos un medio de contacto.
                    </p>
                  )}


                  <p className="text-sm text-gray-500 mt-2">
                    Contact mediums seleccionados: {JSON.stringify(formData.contactMediums)}
                  </p>

                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Guardar Cliente
                    </button>
                  </div>

                </div>
              </form>


            )}

            {/* Lista de Clientes con buscador */}
            {activeTab === 2 && (
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
                      client.pymeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                              <span className={`inline-block w-2 h-2 rounded-full ${client.contactFrecuency === "Alta Prioridad" ? "bg-red-500" :
                                client.contactFrecuency === "Media" ? "bg-yellow-500" :
                                  client.contactFrecuency === "Baja" ? "bg-green-500" :
                                    "bg-purple-500"
                                }`}></span>
                              <h3 className="text-sm font-semibold truncate">{client.pymeName}</h3>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{client.industry}</p>
                          </div>

                          {/* Columna 2: Contacto */}
                          <div className="col-span-3">
                            <p className="text-sm truncate">{client.fullName}</p>
                            <p className="text-xs text-gray-500 truncate">{client.position}</p>
                          </div>

                          {/* Columna 3: Detalles */}
                          <div className="col-span-3">
                            <div className="flex gap-2 text-xs">
                              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                {client.employees} empleados
                              </span>
                              <span className="px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                                {client.marketYears} años
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
                            <h2 className="text-3xl font-bold text-gray-800">{selectedClient.pymeName}</h2>
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
                                  <dd className="text-gray-900">{selectedClient.position}</dd>
                                </div>
                                <div>
                                  <dt className="font-medium text-gray-600">Contacto</dt>
                                  <dd className="text-gray-900">{selectedClient.phone}</dd>
                                  <dd className="text-blue-600 hover:underline">{selectedClient.email}</dd>
                                </div>
                                <div>
                                  <dt className="font-medium text-gray-600">Canales preferidos</dt>
                                  <dd className="text-gray-900">
                                    {selectedClient.contactMediums.join(', ') || 'No especificado'}
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
                                    {selectedClient.generalGoal || 'No especificado'}
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
                                  <dd className="text-gray-900">{selectedClient.employees} empleados</dd>
                                </div>
                                <div>
                                  <dt className="font-medium text-gray-600">Antigüedad</dt>
                                  <dd className="text-gray-900">{selectedClient.marketYears} años</dd>
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
                                    {selectedClient.socialNetwork || 'No especificado'}
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
                                    {selectedClient.obtacles || 'No especificado'}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-600">Resultados anteriores</h4>
                                  <p className="text-gray-900 whitespace-pre-line">
                                    {selectedClient.previousAttempts || 'No especificado'}
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
            {activeTab === 3 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Historial de Interacciones</h2>
                <div className="space-y-4">
                  {clients.map(client => (
                    client.lastInteraction && client.lastInteraction !== "N/A" && (
                      <div key={`${client.id}-interaction`} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{client.pymeName}</h3>
                          <span className="text-sm text-gray-500">{client.lastInteraction}</span>
                        </div>
                        <div className="mt-2 text-gray-600">
                          <p>📞 {client.contactMediums.join(", ")}</p>
                          <p>📝 Notas: {client.previousAttempts || "Sin notas"}</p>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Pipeline Kanban
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
                                    <h3 className="font-semibold">{client.pymeName}</h3>
                                    <p className="text-sm text-gray-500">{client.fullName}</p>
                                    <span className={`text-xs px-1 py-0.5 rounded ${client.contactFrecuency === "Alta Prioridad"
                                      ? "bg-red-100 text-red-800"
                                      : client.contactFrecuency === "Media"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                      }`}>
                                      {client.contactFrecuency}
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
            )} */}

            {/* Estado del Cliente */}
            {activeTab === 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Alta Prioridad', 'Media', 'Baja', 'Prioridad especial', 'Requiere atención'].map((contactFrecuency) => (
                    <div key={contactFrecuency} className="p-4 border rounded-lg">
                      <h3 className="font-semibold flex items-center gap-2">
                        <span className={`inline-block w-3 h-3 rounded-full ${contactFrecuency === 'Alta Prioridad' ? 'bg-red-500' :
                          contactFrecuency === 'Media' ? 'bg-yellow-500' :
                            contactFrecuency === 'Baja' ? 'bg-green-500' :
                              contactFrecuency === 'Prioridad especial' ?
                                'bg-purple-500' : 'bg-gray-800'
                          }`}></span>
                        {contactFrecuency}
                      </h3>
                      <p className="text-2xl font-bold mt-2">
                        {clients.filter(c => c.contactFrecuency === contactFrecuency).length}
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
                          <span>{client.pymeName}</span>
                          <span className={`text-xs px-2 py-1 rounded ${client.stage === "Lead" ? "bg-blue-100 text-blue-800" :
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
                        {clients.filter(c => c.generalGoal.includes("ventas")).length} buscan aumentar ventas
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600">Principales Desafíos</p>
                      <p className="font-medium mt-1">
                        {clients.filter(c => c.obtacles.includes("visibilidad")).length} con problemas de visibilidad
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-600">Canales Preferidos</p>
                      <p className="font-medium mt-1">
                        {clients.filter(c => c.contactMediums.includes("WhatsApp")).length} prefieren WhatsApp
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