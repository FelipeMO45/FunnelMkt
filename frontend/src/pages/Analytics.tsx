import Card from "./cards";
import { FaChartBar } from "react-icons/fa";
import Sidebar from "../components/sidebar";
import DBHeader from "../components/DashboardHeader";

const Analytics = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DBHeader />

        {/* Main */}
        <main className="p-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
      <br />
      <div className="flex space-x-4">
        <Card icon={FaChartBar} title="Miembros totales" value="2" percentage="100" trend="up" />
        <Card icon={FaChartBar} title="Suscriptores Activos" value="1" percentage="0" trend="down" />
        <Card icon={FaChartBar} title="Suscriptores Inactivos" value="0" percentage="0" trend="up" />
        <Card icon={FaChartBar} title="Nuevos Miembros mensuales" value="2" percentage="100" trend="up" />
      </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
