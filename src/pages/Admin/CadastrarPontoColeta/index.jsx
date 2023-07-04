import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin";
import axios from "axios";
import "./style.css";
import { buscarEnderecoPorCep } from "../../../utils/helpers";
import BoxTitleSection from "../../../components/BoxTitleSection";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../../../utils/axiosWithAuth";

const CadastrarPontoColeta = () => {
  const [dados, setDados] = useState({
    nomePonto: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [cadastroEfetuado, setCadastroEfetuado] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const usuarioId = localStorage.getItem("usuarioId");
  //   const userType = localStorage.getItem("usuarioTipo");

  //   if (!token || !usuarioId) {
  //     navigate("/login");
  //   } else if (userType !== "admin") {
  //     navigate("/unauthorized");
  //   }
  // }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === "numero" ? parseInt(value) : value;
    setDados((prevDados) => ({
      ...prevDados,
      [name]: parsedValue,
    }));
    setCadastroEfetuado(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestBody = {
        nomePonto: dados.nomePonto,
        cep: dados.cep.replace('-', ''),
        logradouro: dados.logradouro,
        numero: dados.numero,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.estado,
      };

      const response = await axiosWithAuth().post(
        "http://localhost:5059/api/collectpoint/create",
        requestBody
      );

      if (response.status === 200) {
        setCadastroEfetuado(true);
        setDados({
          nomePonto: "",
          cep: "",
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
        });
      }

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

  const buscarEndereco = async () => {
    await buscarEnderecoPorCep(dados.cep, setDados);
  };

  return (
    <div className="cadastrar-usuario">
      <SidebarAdmin />
      <main>
        <BoxTitleSection titulo={"Cadastrar ponto"} />
        <div>
          <div className="box-admin">
            <div className="title-box">
              <p>Cadastrar novo ponto</p>
            </div>
            <div className="formulario-usuario">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div>
                    <input
                      placeholder="Nome do Ponto de Coleta"
                      type="text"
                      id="nome"
                      name="nomePonto"
                      value={dados.nomePonto}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <input
                      placeholder="CEP"
                      type="text"
                      id="cep"
                      name="cep"
                      value={dados.cep.replace('-', '')}
                      onChange={handleChange}
                      onBlur={buscarEndereco}
                      maxLength={8}
                      inputMode="numeric"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <input
                      placeholder="Rua"
                      type="text"
                      id="rua"
                      name="logradouro"
                      value={dados.logradouro}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <input
                      placeholder="Número"
                      type="number"
                      id="numero"
                      name="numero"
                      value={dados.numero}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                      <input
                        placeholder="Complemento"
                        type="text"
                        id="complemento"
                        name="complemento"
                        value={dados.complemento}
                        onChange={handleChange}
                      />
                    </div>
                </div>
                  <div className="form-row">
                    <div>
                      <input
                        placeholder="Bairro"
                        type="text"
                        id="bairro"
                        name="bairro"
                        value={dados.bairro}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                <div className="form-row">
                  <div>
                    <input
                      placeholder="Cidade"
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={dados.cidade}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                      <input
                        placeholder="Estado"
                        type="text"
                        id="estado"
                        name="estado"
                        value={dados.estado}
                        onChange={handleChange}
                        maxLength={2}
                        required
                      />
                    </div>
                </div>
                <button className="btn-cadastrar-usuario" type="submit">
                  Cadastrar
                </button>
              </form>
              {cadastroEfetuado && (
                <div className="overlay" onClick={() => setCadastroEfetuado(false)}>
                  <div className="mensagem-doacao-efetuada">
                    <p>CADASTRO EFETUADO COM SUCESSO!</p>
                    <span
                      className="fechar"
                      onClick={() => setCadastroEfetuado(false)}
                    >
                      x
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CadastrarPontoColeta;
