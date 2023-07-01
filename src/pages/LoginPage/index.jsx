import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import logo_login from "../../assets/images/logo-doe-agasalho.png";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7243/api/login/signin",
        {
          login: username,
          senha: password,
        }
      );
  
      const token = response.data.token;
      const usuarioTipo = response.data.usuario.tipo;
      const usuarioId = response.data.usuario.id;
      const usuarioNome = response.data.usuario.nome;
  
      localStorage.setItem("token", token);
      localStorage.setItem("usuarioTipo", usuarioTipo);
      localStorage.setItem("usuarioId", usuarioId);
      localStorage.setItem("usuarioNome", usuarioNome);    
      setErrorMessage("");
   
      if (usuarioTipo === "normal") {
        navigate("/home");
      } else if (usuarioTipo === "admin") {
        navigate("/homeadmin");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setUsername("");
      setPassword("");
    }
  };

  const getInputClassName = () => {
    return errorMessage ? "password-input error" : "password-input";
  };

  return (
    <div className="banner-login">
      <div className="login-container">
        <img src={logo_login} alt="Logo Doe Agasalho" className="logo-login" />
        <div>
          <h2>Entrar</h2>
          {errorMessage && <p className="mensagem-erro">{errorMessage}</p>}
          <form>
            <div>
              <input
                placeholder="Digite o usuário"
                type="text"
                value={username}
                className={getInputClassName()}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Digite a senha"
                type="password"
                value={password}
                className={getInputClassName()}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleLogin}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
