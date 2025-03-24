import { useState } from "react";
import { FaGoogle  } from "react-icons/fa";
export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validaciones en tiempo real
    if (name === "email" && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Correo inválido" }));
    } else if (name === "email") {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (name === "password" && value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "La contraseña debe tener al menos 8 caracteres",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (name === "confirmPassword" && value !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Las contraseñas no coinciden",
      }));
    } else if (name === "confirmPassword") {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const isFormValid =
    formData.email &&
    formData.password.length >= 8 &&
    formData.confirmPassword === formData.password &&
    formData.fullName &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-xl font-bold text-gray-900 text-center">
          Regístrate en <span className="text-yellow-500">Funnel Mkt</span>
        </h2>

        <button className="w-full mt-4 flex items-center justify-center border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
          <FaGoogle className="mr-2 text-yellow-400" />
          Continuar con Google
        </button>

        <div className="my-4 text-center text-gray-400">OR</div>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 text-white font-semibold rounded-lg ${
              isFormValid
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
        ¿Ya tienes una cuenta?{" "}
          <a href="#" className="text-yellow-500"
          onClick={() => (window.location.href = "/login")}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
