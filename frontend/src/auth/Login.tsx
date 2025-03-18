import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle, FaFacebook, FaEnvelope, FaLock } from "react-icons/fa";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe incluir al menos una mayúscula")
    .regex(/[0-9]/, "Debe incluir al menos un número")
    .regex(/[\W_]/, "Debe incluir al menos un carácter especial"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 flex flex-col">
        {/* Header dentro del contenedor */}
        <div className="text-right mb-4">
          <button className="text-gray-600 hover:text-black transition"
                    onClick={() => (window.location.href = "/")}>Regresar al inicio</button>
        </div>

        {/* Formulario de Login */}
        <div className="w-full flex flex-col md:flex-row items-center">
          {/* Imagen */}
          <div className="hidden md:flex w-1/2 justify-center">
            <img src="/src/assets/loginimage.svg" alt="Login Illustration" className="w-72" />


          </div>

          {/* Formulario */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Bienvenido a <span className="text-yellow-500 hover:text-yellow-600 transition">Funnel Mkt</span>
            </h2>

            {/* Botones de Login Social */}
            <div className="flex flex-col gap-3 mt-4">
              <button className="flex items-center justify-center border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <FaGoogle className="mr-2 text-yellow-400" /> Inicia con Google
              </button>
              <button className="flex items-center justify-center border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <FaFacebook className="mr-2 text-blue-600" /> Inicia con Facebook
              </button>
            </div>

            <div className="my-4 text-center text-gray-500">O</div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-gray-700">Email</label>
                <div className="flex items-center border rounded-lg p-2">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full outline-none"
                    {...register("email")}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700">Contraseña</label>
                <div className="flex items-center border rounded-lg p-2">
                  <FaLock className="text-gray-400 mr-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="w-full outline-none"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="ml-2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between text-sm text-gray-500">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Recordar
                </label>
                <a href="#" className="text-yellow-500">¿Contraseña olvidada?</a>
              </div>

              {/* Botón de Login */}
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600"
                onClick={() => (window.location.href = "/analytics")}
              >
                Acceder
              </button>
            </form>

            {/* Registro */}
            <p className="text-sm text-gray-500 text-center mt-4">
              ¿No tienes una cuenta? <a href="#" className="text-yellow-500 font-semibold">Regístrate</a>
            </p>
          </div>
        </div>

        {/* Footer dentro del contenedor */}
        <div className="text-center text-gray-500 text-sm mt-6">
          All rights reserved © 2025
        </div>
      </div>
    </div>
  );
};

export default Login;
