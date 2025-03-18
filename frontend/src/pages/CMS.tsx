import Sidebar from '../components/sidebar';
import DBHeader from '../components/DashboardHeader';


const CMS: React.FC = () => {
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
        <h1 className="text-2xl font-bold">Editor de Landing Page</h1>
        <p>Personaliza tu sitio web con nuestras herramientas.</p>

        </main>
      </div>
    </div>
  );
};

export default CMS;
