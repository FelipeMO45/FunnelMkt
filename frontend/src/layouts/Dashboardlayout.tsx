import Sidebar from '../components/sidebar';
import DBHeader from '../components/DashboardHeader';
import Card from '../pages/cards';
import { FaChartBar } from "react-icons/fa";



const Dashboardlayout = () => {
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
            <Card icon={FaChartBar} title="Miembros totales" value="1500" percentage="10" trend="up" />
            <Card icon={FaChartBar} title="Suscriptores Activos" value="1500" percentage="10" trend="up" />
            <Card icon={FaChartBar} title="Suscriptores Inactivos" value="1500" percentage="10" trend="up" />
            <Card icon={FaChartBar} title="Nuevos Miembros mensuales" value="1500" percentage="10" trend="up" />
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboardlayout;
