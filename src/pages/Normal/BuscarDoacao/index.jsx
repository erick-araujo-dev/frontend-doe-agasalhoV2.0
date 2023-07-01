import React, { useState, useEffect } from "react";
import {  handleTipoChange } from "../../../utils/helpers";
import SidebarUser from "../../../components/SidebarUser";
import "./style.css";
import BoxTitleSection from "../../../components/BoxTitleSection";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../../../utils/axiosWithAuth";

const BuscarDoacao = () => {
  const [resultados, setResultados] = useState([]);
  const [tamanhos, setTamanhos] = useState([]);
  const [doacaoConfirmada, setDoacaoConfirmada] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [doacaoEfetuada, setDoacaoEfetuada] = useState(false);
  const [doacaoNaoEncontrada, setDoacaoNaoEncontrada] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId");
    const userType = localStorage.getItem("usuarioTipo");

    if (!token || !usuarioId) {
      navigate("/login");
    } else if (userType !== "normal") {
      navigate("/unauthorized"); 
    }
  }, []);
  
  const handleBuscar = async () => {
    setDoacaoEfetuada(false);
    const tipo = document.getElementById("tipo").value;
    const tamanho = document.getElementById("tamanho").value;
    const genero = document.getElementById("genero").value;

    try {
      const response = await axiosWithAuth().post(
        "https://localhost:7243/api/produtos/buscar",
        {
          usuarioId: localStorage.getItem("usuarioId"),
          tipo: tipo,
          tamanho: tamanho,
          genero: genero,
        }
      );

      const produtos = response.data.$values || [];
      setResultados(produtos);
      setDoacaoConfirmada(false);
      setItemSelecionado(null);
      setDoacaoNaoEncontrada(produtos.length === 0);
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os produtos:", error);
    }
  };

  const handleAtualizarEstoque = async () => {
    const usuarioId = 2;
    const tipo = document.getElementById("tipo").value;
    const tamanho = document.getElementById("tamanho").value;
    const genero = document.getElementById("genero").value;

    try {
      const response = await axiosWithAuth().post(
        "https://localhost:7243/api/produtos/buscar",
        {
          usuarioId: usuarioId,
          tipo: tipo,
          tamanho: tamanho,
          genero: genero,
        }
      );

      setResultados(response.data.$values || []);
      setDoacaoConfirmada(false);
      setItemSelecionado(null);
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os produtos:", error);
    }
  };

  const handleDoar = (item) => {
    if (item.estoque < 1) {
      alert("Não há estoque disponível para esta doação.");
      return;
    }

    setItemSelecionado(item);
    setDoacaoConfirmada(true);
    setDoacaoEfetuada(false);
  };

  const handleCancelarDoacao = () => {
    setDoacaoConfirmada(false);
    setItemSelecionado(null);
  };

  const handleConfirmarDoacao = async () => {
    try {
      const response = await axiosWithAuth().post(
        "https://localhost:7243/api/doacoes/saidadoacao",
        {
          produtoId: itemSelecionado.id,
        }
      );

      setDoacaoConfirmada(false);
      setItemSelecionado(null);
      setDoacaoEfetuada(true);

      handleAtualizarEstoque();
    } catch (error) {
      console.error("Ocorreu um erro ao confirmar doação:", error);

    }
  };

  return (
    <div className="buscar-doacao">
      <SidebarUser />
      <main>
        <BoxTitleSection titulo={"Buscar doaçao"}/>
        <div className="container-select-busca">
          <div className="select-busca">
            <label htmlFor="tipo">Tipo:</label>
            <select
              id="tipo"
              onChange={(event) => handleTipoChange(event, setTamanhos)}
            >
              <option value="">Selecionar</option>
              <option value="Blusa">Blusa</option>
              <option value="Jaqueta">Jaqueta</option>
              <option value="Moletom">Moletom</option>
              <option value="Camiseta">Camiseta</option>
              <option value="Camisa">Camisa</option>
              <option value="Calça">Calça</option>
              <option value="Calçado">Calçado</option>
              <option value="Gorro">Gorro</option>
              <option value="Cachecol">Cachecol</option>
              <option value="Meias">Meias</option>
              <option value="Cobertor">Cobertor</option>
            </select>
          </div>
          <div className="select-busca">
            <label htmlFor="tamanho">Tamanho:</label>
            <select id="tamanho">
              <option value="">Selecionar</option>
              {tamanhos.map((size) => (
                <option value={size} key={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="select-busca">
            <label htmlFor="genero">Gênero:</label>
            <select id="genero">
              <option value="">Selecionar</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="U">Unissex</option>
            </select>
          </div>
          <button
            type="button"
            className="btn-buscar-cadastrar"
            onClick={handleBuscar}
          >
            Buscar
          </button>
        </div>
        <div className="box-busca-cadastro">
          <div className="box-header-busca-cadastro">
            <p>Resultado:</p>
          </div>
          <div className="lista-resultado-busca">
            {doacaoNaoEncontrada ? (
              <div className="doacao-nao-encontrada">
                <p>Item indisponível em estoque!</p>
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Tamanho</th>
                    <th>Gênero</th>
                    <th>Estoque</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((item) => (
                    <tr key={item.$id}>
                      <td>{item.tipo}</td>
                      <td>{item.tamanho}</td>
                      <td>
                        {item.genero === "M"
                          ? "Masculino"
                          : item.genero === "F"
                          ? "Feminino"
                          : "Unissex"}
                      </td>
                      <td>{item.estoque}</td>
                      <td>
                        <button
                          className="btn-doar"
                          onClick={() => handleDoar(item)}
                        >
                          Doar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {doacaoConfirmada && itemSelecionado && (
            <div className="doacao-confirmada">
              <h2>CONFIRMAR DOAÇÃO</h2>
              <p>Você está prestes a doar o seguinte item:</p>
              <table>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Tamanho</th>
                    <th>Gênero</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{itemSelecionado.tipo}</td>
                    <td>{itemSelecionado.tamanho}</td>
                    <td>{itemSelecionado.genero}</td>
                  </tr>
                </tbody>
              </table>

              <div className="botoes-confirmacao">
                <button onClick={handleCancelarDoacao}>Cancelar</button>
                <button onClick={handleConfirmarDoacao}>Confirmar</button>
              </div>
            </div>
          )}
          {doacaoEfetuada && (
            <div className="mensagem-doacao-efetuada">
              <p>DOAÇÃO EFETUADA COM SUCESSO!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BuscarDoacao;
