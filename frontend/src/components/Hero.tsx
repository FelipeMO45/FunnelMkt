import StartBuilding from "../assets/start-building.svg";

const Hero = () => {
  return (
    <section className="px-[15%] py-12 flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold">
        Optimiza, automatiza y potencia tu negocio con <span className="text-yellow-400  hover:text-yellow-500 transition">FunnelMKT</span>.
        </h2>

        <p className="text-gray-700 mt-4">
        Conecta tu CRM y CMS en una plataforma inteligente que simplifica la gestión, mejora la conversión y acelera tu crecimiento digital.
        </p>
        <div className="mt-4 flex gap-4">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded  hover:bg-yellow-500 transition"
          onClick={() => (window.location.href = "/ruta-prices")}>Precios</button>

          <button className="bg-yellow-400 text-black px-4 py-2 rounded   hover:bg-yellow-500 transition"
          onClick={() => (window.location.href = "/ruta-register")}>Comienza ahora</button>
        </div>
      </div>
      <div className="md:w-1/2">
      <img src={StartBuilding} alt="Empieza" className="w-full h-80 object-contain" />
      </div>
    </section>
  );
};

export default Hero;
