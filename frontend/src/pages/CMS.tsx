import { useState } from "react";
import Sidebar from "../components/sidebar";
import DBHeader from "../components/DashboardHeader";

const CMS: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    headerTitle: "Bienvenido a mi sitio",
    headerSubtitle: "Crea tu web con nuestro CMS",
    contentText: "Aquí va el contenido de tu sitio web.",
    footerText: "© 2025 Todos los derechos reservados",
    headerBgColor: "#1e3a8a",
    headerTextColor: "#ffffff",
    headerFontSize: "24px",
    headerFontFamily: "Arial",
  });

  const [titles, setTitles] = useState([{ id: Date.now(), text: "Título de ejemplo" }]);
  const [contents, setContents] = useState([{ id: Date.now(), text: "Texto de contenido" }]);
  const [images, setImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      previewInNewTab();
    }
  };

  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const previewInNewTab = () => {
    const pageContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vista Previa</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            background: #f4f4f4;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          header {
            background: ${formData.headerBgColor};
            color: ${formData.headerTextColor};
            padding: 20px;
            font-size: ${formData.headerFontSize};
            font-family: ${formData.headerFontFamily}, sans-serif;
          }
          section {
            padding: 20px;
            background: white;
            margin: 20px auto;
            width: 80%;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            flex-grow: 1;
          }
          footer {
            background: #111;
            color: white;
            padding: 10px;
            margin-top: auto;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>${formData.headerTitle}</h1>
          <p>${formData.headerSubtitle}</p>
        </header>
        <section>
          ${titles.map((title) => `<h2>${title.text}</h2>`).join("")}
          ${contents.map((content) => `<p>${content.text}</p>`).join("")}
          ${images.map((img) => `<img src="${img}" style="width:200px;height:auto;margin:10px;">`).join("")}
        </section>
        <footer>
          <p>${formData.footerText}</p>
        </footer>
      </body>
      </html>
    `;

    const newTab = window.open("", "_blank");
    if (newTab) {
      newTab.document.open();
      newTab.document.write(pageContent);
      newTab.document.close();
    } else {
      alert("Permite las ventanas emergentes para ver la vista previa.");
    }
  };

  const addTitle = () => setTitles([...titles, { id: Date.now(), text: "" }]);
  const removeTitle = (id: number) => setTitles(titles.filter((title) => title.id !== id));

  const addContent = () => setContents([...contents, { id: Date.now(), text: "" }]);
  const removeContent = (id: number) => setContents(contents.filter((content) => content.id !== id));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = URL.createObjectURL(e.target.files[0]);
      setImages([...images, file]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DBHeader />

        <main className="p-8 max-w-5xl w-full mx-auto bg-white shadow-lg rounded-xl flex-1">
          <h1 className="text-3xl font-bold text-center mb-6">Editor de Landing Page</h1>

          <div className="flex justify-center mb-6 gap-4">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg transition-all ${
                  step === num ? "bg-blue-600 scale-110 shadow-md" : "bg-gray-400"
                }`}
              >
                {num}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold">Encabezado</h2>
              <input type="text" name="headerTitle" value={formData.headerTitle} onChange={handleChange} className="w-full p-3 border rounded-lg mt-2" placeholder="Título del encabezado" />
              <input type="text" name="headerSubtitle" value={formData.headerSubtitle} onChange={handleChange} className="w-full p-3 border rounded-lg mt-2" placeholder="Subtítulo" />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold">Contenido</h2>

              {titles.map((title) => (
                <div key={title.id} className="flex gap-2 mt-2">
                  <input type="text" value={title.text} onChange={(e) => setTitles(titles.map((t) => (t.id === title.id ? { ...t, text: e.target.value } : t)))} className="w-full p-3 border rounded-lg" placeholder="Título" />
                  <button onClick={() => removeTitle(title.id)} className="bg-red-500 text-white px-3 py-2 rounded">X</button>
                </div>
              ))}
              <button onClick={addTitle} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Agregar Título</button>

              {contents.map((content) => (
                <div key={content.id} className="flex gap-2 mt-2">
                  <textarea value={content.text} onChange={(e) => setContents(contents.map((c) => (c.id === content.id ? { ...c, text: e.target.value } : c)))} className="w-full p-3 border rounded-lg" placeholder="Contenido" />
                  <button onClick={() => removeContent(content.id)} className="bg-red-500 text-white px-3 py-2 rounded">X</button>
                </div>
              ))}
              <button onClick={addContent} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Agregar Campo de Texto</button>

              <input type="file" onChange={handleImageUpload} className="mt-4" />
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button onClick={prevStep} className="bg-gray-600 text-white py-2 px-6 rounded-lg" disabled={step === 1}>
              Anterior
            </button>
            <button onClick={nextStep} className={`py-2 px-6 rounded-lg ${step < 3 ? "bg-blue-600 text-white" : "bg-green-600 text-white"}`}>
              {step < 3 ? "Siguiente" : "Vista Previa"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CMS;
