import React, { useState, useEffect } from "react";
import SidebarUser from "../../../components/SidebarUser";
import "./style.css";
import BoxTitleSection from "../../../components/BoxTitleSection";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import { getCharacteristics, getGenders, getSizes, getTypes } from "../../../utils/api";

const BuscarDoacao = () => {
  const [resultados, setResultados] = useState([]);
  const [tamanhos, setTamanhos] = useState([]);
  const [doacaoConfirmada, setDoacaoConfirmada] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [doacaoEfetuada, setDoacaoEfetuada] = useState(false);
  const [doacaoNaoEncontrada, setDoacaoNaoEncontrada] = useState(false);
  const navigate = useNavigate();

  const [types, setTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    const getValueById = (elementId) => {
      return document.getElementById(elementId).value;
    };
    const type = getValueById("tipo");
    const size = getValueById("tamanho");
    const gender = getValueById("genero");
    const characteristic = getValueById("caracteristica");

    getTypes(setTypes, size, gender, characteristic);
    getSizes(setSizes, type, gender, characteristic);
    getCharacteristics(setCharacteristics, type, size, gender);
    getGenders(setGenders, type, size, characteristic);
    handleFetch();
  }, []);

  const handleSelectChange = (event) => {
    const { id, value } = event.target;
    const type = id === "tipo" ? value : document.getElementById("tipo").value;
    const size = id === "tamanho" ? value : document.getElementById("tamanho").value;
    const gender = id === "genero" ? value : document.getElementById("genero").value;
    const characteristic = id === "caracteristica" ? value : document.getElementById("caracteristica").value;
  
    getTypes(setTypes, size, gender, characteristic);
    getSizes(setSizes, type, gender, characteristic);
    getCharacteristics(setCharacteristics, type, size, gender);
    getGenders(setGenders, type, size, characteristic);
  };

  const handleFetch = async () => {
    setDoacaoEfetuada(false);
    const type = document.getElementById("tipo").value;
    const characteristic = document.getElementById("caracteristica").value;
    const size = document.getElementById("tamanho").value;
    const gender = document.getElementById("genero").value;

    try {
      const response = await axiosWithAuth().get(
        "http://localhost:5059/api/products?type=" +
          type  +
          "&size=" +
          size +
          "&gender=" +
          gender +
          "&characteristic=" + characteristic
      );

      const products = response.data.$values || [];
      setResultados(products);
      setDoacaoConfirmada(false);
      setItemSelecionado(null);
      setDoacaoNaoEncontrada(products.length === 0);
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os produtos:", error);
    }
  };

  const handleAtualizarEstoque = async () => {
    const type = document.getElementById("tipo").value;
    const characteristic = document.getElementById("caracteristica").value;
    const size = document.getElementById("tamanho").value;
    const gender = document.getElementById("genero").value;

    try {
      const response = await axiosWithAuth().get(
        "http://localhost:5059/api/products?type=" +
          type  +
          "&size=" +
          size +
          "&gender=" +
          gender +
          "&characteristic=" + characteristic
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
        "http://localhost:5059/api/donations/inventory/exit",
        {
          produtoId: itemSelecionado.id,
          quantidade: 1
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
        <BoxTitleSection titulo={"Buscar doaçao"} />
        <div className="container-select-busca">
          <div className="select-busca">
            <label htmlFor="tipo">Tipo:</label>
            <select id="tipo" onChange={handleSelectChange}>
              <option value="">Selecionar</option>
              {types.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="select-busca">
            <label htmlFor="caracteristica">Estilo:</label>
            <select id="caracteristica" onChange={handleSelectChange}>
              <option value="">Selecionar</option>
              {characteristics.map((characteristic) => (
                <option key={characteristic} value={characteristic}>
                  {characteristic}
                </option>
              ))}
            </select>
          </div>
          <div className="select-busca">
            <label htmlFor="tamanho">Tamanho:</label>
            <select id="tamanho" onChange={handleSelectChange}>
              <option value="">Selecionar</option>
              {sizes.map((size) => (
                <option value={size.id} key={size.id}>
                  {size.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="select-busca">
            <label htmlFor="genero">Gênero:</label>
            <select id="genero" onChange={handleSelectChange}>
              <option value="">Selecionar</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender === "M"
                          ? "Masculino"
                          : gender === "F"
                          ? "Feminino"
                          : "Unissex"}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn-buscar-cadastrar"
            onClick={handleFetch}
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
                    <th>Estilo</th>
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
                      <td>{item.caracteristica}</td>
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
            <div className="overlay">
              <div className="doacao-confirmada">
                <h2>CONFIRMAR DOAÇÃO</h2>
                <p>Você está prestes a doar o seguinte item:</p>
                <table>
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Estilo</th>
                      <th>Tamanho</th>
                      <th>Gênero</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{itemSelecionado.tipo}</td>
                      <td>{itemSelecionado.caracteristica}</td>
                      <td>{itemSelecionado.tamanho}</td>
                      <td>{itemSelecionado.genero === "M" ? "Masculino" : item.genero === "F" ? "Feminino": "Unissex"}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="botoes-confirmacao">
                  <button onClick={handleCancelarDoacao}>Cancelar</button>
                  <button onClick={handleConfirmarDoacao}>Confirmar</button>
                </div>
              </div>
            </div>
          )}
          {doacaoEfetuada && (
            <div className="overlay" onClick={() => setDoacaoEfetuada(false)}>
              <div className="mensagem-doacao-efetuada">
                <p>DOAÇÃO EFETUADA COM SUCESSO!</p>
                <span
                  className="fechar"
                  onClick={() => setDoacaoEfetuada(false)}
                >
                  x
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BuscarDoacao;
