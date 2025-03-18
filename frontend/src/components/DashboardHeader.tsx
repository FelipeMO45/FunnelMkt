
const DBHeader = () => {
  return (
    <header className="bg-[#192124] text-white p-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 rounded bg-gray-700 text-white focus:outline-none"
      />
      <span className="font-semibold text-yellow-500 hover:text-yellow-600 transition"
      onClick={() => (window.location.href = "/profile")}>Felipe</span>
    </header>
  );
};

export default DBHeader;
