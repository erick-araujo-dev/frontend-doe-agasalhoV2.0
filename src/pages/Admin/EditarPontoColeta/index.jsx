import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin";
import { Pencil, Trash } from "phosphor-react";
import "./style.css";
import FormEditarPontoColeta from "../../../components/FormEditarPontoColeta";
import BoxTitleSection from "../../../components/BoxTitleSection";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import {verifyAuthenticationAdmin} from "../../../utils/verifyAuthentication";
import { getCollectionPoints } from "../../../utils/api";

const EditarPontoColeta = () => {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [selectedCollectPoint, setSelectedCollectPoint] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  verifyAuthenticationAdmin(); 

  useEffect(() => {
    getCollectionPoints(setCollectionPoints);
  }, []);

  const editCollectPoint = (id) => {
    const collectPointFound = collectionPoints.find((p) => p.id === id);
    setSelectedCollectPoint(collectPointFound);
    setDisplayForm(true);
  };

  const deleteCollectPoint = (id) => {
    const collectPointFound = collectionPoints.find((p) => p.id === id);
    setSelectedCollectPoint(collectPointFound);
    setShowConfirmation(true);
  };

  const confirmDeletion = async () => {
    try {
      await axiosWithAuth().put(`http://localhost:5059/api/collectpoint/${selectedCollectPoint.id}/deactivate`);
      setShowConfirmation(false);
      await getCollectionPoints();
    } catch (error) {
      if (error.response) {
        alert(error.response.data)
      } else if (error.request) {
        console.error("Erro ao fazer a solicitação:", error.request);
      } else {
        console.error("Erro ao configurar a solicitação:", error.message);
      }
    }
  };

  const handleCancelDeletion = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="editar-usuario">
      <SidebarAdmin />
      <main>
      <BoxTitleSection titulo={"Editar ponto"}/>

        <div className="section-box">
          {displayForm ? (
            <FormEditarPontoColeta
              pontoColeta={selectedCollectPoint}
              mostrarFormulario={() => setDisplayForm(false)}
            />
          ) : (
            <div className="box-admin">
              <div className="title-box">
                <p>Pontos de coleta e distribuição:</p>
              </div>
              {showConfirmation ? (
                <div className="doacao-confirmada">
                  <h2>CONFIRMAR EXCLUSÃO!</h2>
                  <p>Você está prestes a excluir o usuário:<br/>
                    <strong>{selectedCollectPoint.nomePonto}</strong> <br/>
                    Após realizar a exclusão todo o registro de estoque do usuário excluído será perdido.<br/>
                    Esta ação é irreversível, certifique-se de que esteja certo disso.</p>
                  <div className="botoes-confirmacao">
                    <button onClick={handleCancelDeletion}>Cancelar</button>
                    <button onClick={confirmDeletion}>Confirmar</button>
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
                        {collectionPoints.map((pontoColeta) => (
                          <tr key={pontoColeta.id}>
                            <td>{pontoColeta.nomePonto}</td>
                            <td>{pontoColeta.quantidadeUsuarios}</td>
                            <td>{pontoColeta.quantidadeProdutos}</td>
                            <td>
                              <Pencil className="icon-edit-delete" onClick={() => editCollectPoint(pontoColeta.id)} />
                              <Trash className="icon-edit-delete" onClick={() => deleteCollectPoint(pontoColeta.id)}/>
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

export default EditarPontoColeta;
