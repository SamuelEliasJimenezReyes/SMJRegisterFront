import React, { useState } from "react";
import { UserService } from "../../../api/services/user.service.ts";
import type { LoginRequestDto } from "../../../api/dtos/users.dto.ts";

const userService = new UserService();

export default function Login() {
  const [formData, setFormData] = useState<LoginRequestDto>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await userService.loginAsync(formData);
      console.log("✅ Login exitoso:", result);
      localStorage.setItem("jwtToken", result.token);
      window.location.href = "/directivo/campers";
    } catch (err) {
      console.error("❌ Error en login", err);
      setError("Credenciales inválidas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Iniciar Sesión</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="form-control gap-4 mt-4">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Iniciando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
