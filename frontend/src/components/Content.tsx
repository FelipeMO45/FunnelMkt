import GrowingImage from "../assets/growing.svg"; // Importa la imagen

const Content = () => {
  return (
    <section className="px-[15%] py-12 flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/2 flex justify-center">
        <img src={GrowingImage} alt="Crecimiento digital" className="w-full h-80 object-contain" />
      </div>

      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold">Impulsa tu negocio</h2>
        <p className="text-gray-700 mt-4">
          Impulsa todas tus ventas, tu presencia digital y lleva un control de tus clientes y prospectos en un solo lugar.
          Es intuitivo, efectivo y potencia tu negocio desde el primer día. Cada herramienta de FunnelMKT es poderosa por sí sola, pero el verdadero impacto ocurre cuando las usas en conjunto para optimizar tu marketing, ventas y gestión de clientes.

        </p>
      </div>
    </section>
  );
};

export default Content;
