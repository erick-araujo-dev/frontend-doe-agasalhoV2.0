import React, { useState } from "react";
import { UserCircle, CaretDown } from "phosphor-react";
import { handleLogout } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import './style.css'

const BoxTitleSection = ({titulo}) => {
    const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
    const usuarioNome = localStorage.getItem("usuarioNome")
    const navigate = useNavigate();

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
            <p>{usuarioNome && usuarioNome.length > 13
              ? `${usuarioNome.slice(0, 10)}...`
              : usuarioNome}</p>
            <i>
                <UserCircle />
            </i>
        </div>
        {mostrarOpcoes && (
          <div className="opcoes-perfil">
            <button onClick={handleLogoutClick}>Sair do Sistema</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxTitleSection;
