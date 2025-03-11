import { useState } from "react";
import { FaChartBar, FaUserFriends, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`h-screen bg-[#192124] text-white flex flex-col p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="text-3xl font-bold mb-6 text-[#E8C817] "> F{isOpen && <span>unnelMKT</span>}</div>
      <nav className="flex-2">
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center space-x-4">
              <FaChartBar />
              {isOpen && <span>Analytics</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-4">
              <FaUserFriends />
              {isOpen && <span>CRM</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-4">
              <FaCog />
              {isOpen && <span>CMS</span>}
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <a href="#" className="flex items-center space-x-2">
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
