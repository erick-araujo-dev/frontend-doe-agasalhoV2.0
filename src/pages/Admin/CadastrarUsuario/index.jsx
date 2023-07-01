import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin";
import axios from "axios";
import "./style.css";
import { buscarEnderecoPorCep } from "../../../utils/helpers";
import BoxTitleSection from "../../../components/BoxTitleSection";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../../../utils/axiosWithAuth";

const CadastrarUsuario = () => {
  const [dados, setDados] = useState({
    nome: "",
    login: "",
    senha: "",
    tipo: "",
    rua: "",
    numero: 0,
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });
  const [cadastroEfetuado, setCadastroEfetuado] = useState(false); 
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
        nome: dados.nome,
        login: dados.login,
        senha: dados.senha,
        tipo: dados.tipo,
        rua: dados.rua,
        numero: dados.numero,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.estado,
        cep: dados.cep,
      };

      const response = await axiosWithAuth().post(
        "https://localhost:7243/api/usuarios/adicionar",
        requestBody
      );

      if (response.status === 200) {
        setCadastroEfetuado(true); 
        setDados({
          nome: "",
          login: "",
          senha: "",
          tipo: "",
          rua: "",
          numero: 0,
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
          cep: "",
        }); 
      }

    } catch (error) {
      if (error.response) {
        console.error("Erro ao cadastrar usuário:", error.response.status, error.response.data);
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
                      placeholder="Nome"
                      type="text"
                      id="nome"
                      name="nome"
                      value={dados.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <select
                      id="tipo"
                      name="tipo"
                      value={dados.tipo}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="admin">Admin</option>
                      <option value="normal">Normal</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <input
                      placeholder="Login"
                      type="text"
                      id="login"
                      name="login"
                      value={dados.login}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      placeholder="Senha"
                      type="password"
                      id="senha"
                      name="senha"
                      value={dados.senha}
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
                      value={dados.cep}
                      onChange={handleChange}
                      onBlur={buscarEndereco}
                      required
                    />
                  </div>
                  <div>
                    <input
                      placeholder="Rua"
                      type="text"
                      id="rua"
                      name="rua"
                      value={dados.rua}
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
                  <div>
                    <input
                      placeholder="Estado"
                      type="text"
                      id="estado"
                      name="estado"
                      value={dados.estado}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button className="btn-cadastrar-usuario" type="submit">
                  Cadastrar
                </button>
              </form>
              {cadastroEfetuado && (
                <div className="mensagem-doacao-efetuada">
                  <p>CADASTRO EFETUADO COM SUCESSO!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CadastrarUsuario;
