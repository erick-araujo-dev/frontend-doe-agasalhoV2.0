import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin";
import { Pencil, Trash } from "phosphor-react";
import axios from "axios";
import "./style.css";
import FormEditarUsuario from "../../../components/FormEditarUsuario";
import BoxTitleSection from "../../../components/BoxTitleSection";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../../../utils/axiosWithAuth";

const EditarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const usuarioId = localStorage.getItem("usuarioId");
        const userType = localStorage.getItem("usuarioTipo");

        if (!token || !usuarioId) {
            navigate("/login");
        } else if (userType !== "admin") {
            navigate("/unauthorized");
        }
    }, []);

  const buscarUsuarios = async () => {
    try {
      const response = await axiosWithAuth().get("https://localhost:7243/api/usuarios");
      setUsuarios(response.data.$values);
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
    }
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const editarUsuario = (id) => {
    const usuario = usuarios.find((usuario) => usuario.id === id);
    setUsuarioSelecionado(usuario);
    setExibirFormulario(true);
  };

  const excluirUsuario = (id) => {
    const usuario = usuarios.find((usuario) => usuario.id === id);
    setUsuarioSelecionado(usuario);
    setExibirConfirmacao(true);
  };

  const confirmarExclusao = async () => {
    try {
      await axiosWithAuth().delete(`https://localhost:7243/api/usuarios/excluir/${usuarioSelecionado.id}`);
      setExibirConfirmacao(false);
      await buscarUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleCancelarExclusao = () => {
    setExibirConfirmacao(false);
  };

  return (
    <div className="editar-usuario">
      <SidebarAdmin />
      <main>
      <BoxTitleSection titulo={"Editar ponto"}/>

        <div className="section-box">
          {exibirFormulario ? (
            <FormEditarUsuario
              usuario={usuarioSelecionado}
              mostrarFormulario={() => setExibirFormulario(false)}
            />
          ) : (
            <div className="box-admin">
              <div className="title-box">
                <p>Pontos de coleta e distribuição:</p>
              </div>
              {exibirConfirmacao ? (
                <div className="doacao-confirmada">
                  <h2>CONFIRMAR EXCLUSÃO!</h2>
                  <p>Você está prestes a excluir o usuário:<br/>
                    <strong>{usuarioSelecionado.nome}</strong> <br/>
                    Após realizar a exclusão todo o registro de estoque do usuário excluído será perdido.<br/>
                    Esta ação é irreversível, certifique-se de que esteja certo disso.</p>
                  <div className="botoes-confirmacao">
                    <button onClick={handleCancelarExclusao}>Cancelar</button>
                    <button onClick={confirmarExclusao}>Confirmar</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="container-table">
                    <table className="table-editar-usuario">
                      <thead>
                        <tr>
                          <th>Unidade</th>
                          <th>Região</th>
                          <th>Login</th>
                          <th>Tipo Perfil</th>
                          <th>Editar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map((usuario) => (
                          <tr key={usuario.id}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.bairro}</td>
                            <td>{usuario.login}</td>
                            <td>{usuario.tipo}</td>
                            <td>
                              <Pencil className="icon-edit-delete" onClick={() => editarUsuario(usuario.id)} />
                              {usuario.tipo !== "admin" && (
                                <Trash
                                  className="icon-edit-delete"
                                  onClick={() => excluirUsuario(usuario.id)}
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditarUsuario;
