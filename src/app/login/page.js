"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import "../styles/login.css";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUserData } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    let data = await fetch(`${baseUrl}/staff/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    let login = await data.json();

    if (login) {
      alert("Login bem-sucedido!");
      setUserData(login);
      router.push("/dashboard");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <main>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h1 className="login-title">Login</h1>

          <label htmlFor="email" className="login-label">
            email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className="login-input"
            required
          />

          <label htmlFor="password" className="login-label">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="login-input"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <div className="container-btn-login">
            <button type="submit" className="login-button">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
