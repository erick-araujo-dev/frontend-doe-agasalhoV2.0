import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserCircle, CaretDown } from "phosphor-react";
import { handleLogout } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axiosWithAuth from "../../utils/axiosWithAuth";

const BoxTitleSection = ({ titulo }) => {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [usuarioNome, setUsuarioNome] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axiosWithAuth().get(
          `http://localhost:5059/api/users/${localStorage.getItem("usuarioId")}`
        );
        const nomeUsuario = response.data.nome;
        setUsuarioNome(nomeUsuario);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUsuario();
  }, []);
  
  const handlePerfilClick = () => {
    setMostrarOpcoes(!mostrarOpcoes);
  };

  const handleLogoutClick = () => {
    handleLogout(navigate);
  };

  return (
    <div className="box-title">
      <h1>{titulo}</h1>
      <div className="box-perfil" onClick={handlePerfilClick}>
        <div className="logo-nome">
          <p>
          {usuarioNome && usuarioNome.split(" ")[0]}
          </p>
          <i>
            <UserCircle />
          </i>
        </div>
        {mostrarOpcoes && (
          <div className="opcoes-perfil">
            <Link to="/editarnome">Editar Nome</Link>
            <Link to="/alterarsenha">Alterar Senha</Link>
            <button onClick={handleLogoutClick}>Sair do Sistema</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxTitleSection;
