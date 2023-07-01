import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin";
import { Pencil, Trash } from "phosphor-react";
import axios from "axios";
import "./style.css";
import FormEditarPontoColeta from "../../../components/FormEditarPontoColeta";
import BoxTitleSection from "../../../components/BoxTitleSection";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../../../utils/axiosWithAuth";

const EditarUsuario = () => {
  const [pontosColeta, setPontosColeta] = useState([]);
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [pontoColetaSelecionado, setPontoColetaSelecionado] = useState(null);
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

  const buscarpontosColeta = async () => {
    try {
      const response = await axiosWithAuth().get("http://localhost:5059/api/collectpoint/");
      setPontosColeta(response.data.$values);
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
    }
  };

  useEffect(() => {
    buscarpontosColeta();
  }, []);

  const editarPontosColeta = (id) => {
    const pontoColeta = pontosColeta.find((pontoColeta) => pontoColeta.id === id);
    setPontoColetaSelecionado(pontoColeta);
    setExibirFormulario(true);
  };

  const excluirUsuario = (id) => {
    const pontoColeta = pontosColeta.find((pontoColeta) => pontoColeta.id === id);
    setPontoColetaSelecionado(pontoColeta);
    setExibirConfirmacao(true);
  };

  const confirmarExclusao = async () => {
    try {
      await axiosWithAuth().delete(`https://localhost:7243/api/pontosColeta/excluir/${pontoColetaSelecionado.id}`);
      setExibirConfirmacao(false);
      await buscarpontosColeta();
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
            <FormEditarPontoColeta
              pontoColeta={pontoColetaSelecionado}
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
                    <strong>{pontoColetaSelecionado.nomePonto}</strong> <br/>
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
                          <th>Usuarios Cadastrados</th>
                          <th>Doações em estoque</th>
                          <th>Editar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pontosColeta.map((pontoColeta) => (
                          <tr key={pontoColeta.id}>
                            <td>{pontoColeta.nomePonto}</td>
                            <td>{pontoColeta.quantidadeUsuarios}</td>
                            <td>{pontoColeta.quantidadeProdutos}</td>
                            <td>
                              <Pencil className="icon-edit-delete" onClick={() => editarPontosColeta(pontoColeta.id)} />
                              <Trash className="icon-edit-delete" onClick={() => excluirUsuario(pontoColeta.id)}/>
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
