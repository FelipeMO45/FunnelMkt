import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChartBar, FaUserFriends, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`bg-[#192124] text-white flex flex-col p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } h-screen sticky top-0 overflow-y-auto`} // Cambios clave aquí
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="text-3xl font-bold mb-6 text-[#E8C817]">
        F{isOpen && <span>unnelMKT</span>}
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          <SidebarItem to="/analytics" icon={<FaChartBar />} label="Analytics" isOpen={isOpen} />
          <SidebarItem to="/crm" icon={<FaUserFriends />} label="CRM" isOpen={isOpen} />
          {/* <SidebarItem to="/cms" icon={<FaCog />} label="CMS" isOpen={isOpen} /> */}
        </ul>
      </nav>
    </aside>
  );
};

const SidebarItem = ({
  to,
  icon,
  label,
  isOpen,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center space-x-4 px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive ? "bg-[#E8C817] text-[#192124]" : "hover:bg-gray-700"
          }`
        }
      >
        {icon}
        {isOpen && <span>{label}</span>}
      </NavLink>
    </li>
  );
};

export default Sidebar;
