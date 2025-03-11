const Register: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Registro</h1>
      <form>
        <input type="text" placeholder="Nombre completo" className="border p-2" />
        <input type="email" placeholder="Correo electrónico" className="border p-2 mt-2" />
        <input type="password" placeholder="Contraseña" className="border p-2 mt-2" />
        <button className="bg-green-500 text-white p-2 mt-2">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
