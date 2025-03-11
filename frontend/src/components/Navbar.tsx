const Navbar = () => {
  return (
    <nav className="bg-black text-yellow-400 flex justify-between items-center px-8 py-4">
      <h1 className="text-xl font-bold">FunnelMKT</h1>
      <div className="flex gap-4">
        <button
          className="text-yellow-400 hover:text-yellow-300 transition"
          onClick={() => (window.location.href = "/register")}
        >
          Registrate
        </button>
        <button
          className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 transition"
          onClick={() => (window.location.href = "/login")}
        >
          Inicia sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
