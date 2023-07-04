import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin";
import BoxTitleSection from "../../../components/BoxTitleSection";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import verifyAuthentication from "../../../utils/verifyAuthentication";

const CadastrarUsuario = () => {
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "",
    pontoColetaId: "",
  });

  const [mostrarPontoColeta, setMostrarPontoColeta] = useState(true);
  const [pontosColeta, setPontosColeta] = useState([]);
  const [cadastroEfetuado, setCadastroEfetuado] = useState(false);
  const navigate = useNavigate();

  verifyAuthentication(); //Verifiva se o user esta autenticado

  useEffect(() => {
    buscarPontosColeta();
  }, []);

  const buscarPontosColeta = async () => {
    try {
      const response = await axiosWithAuth().get(
        "http://localhost:5059/api/collectpoint"
      );
      setPontosColeta(response.data.$values);
    } catch (error) {
      console.error("Erro ao obter pontos de coleta:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === "numero" ? parseInt(value) : value;
    setDados((prevDados) => ({
      ...prevDados,
      [name]: parsedValue,
    }));

    if (name === "tipo" && value === "admin") {
      setMostrarPontoColeta(false);
    } else {
      setMostrarPontoColeta(true);
    }
    setCadastroEfetuado(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestBody = {
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        tipo: dados.tipo,
        pontoColetaId: dados.pontoColetaId,
      };

      const response = await axiosWithAuth().post(
        "http://localhost:5059/api/users/create",
        requestBody
      );

      if (response.status === 200) {
        setCadastroEfetuado(true);
        setDados({
          nome: "",
          email: "",
          senha: "",
          tipo: "",
          pontoColetaId: "",
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

  return (
    <div className="cadastrar-usuario">
      <SidebarAdmin />
      <main>
        <BoxTitleSection titulo={"Cadastrar Usuário"} />
        <div>
          <div className="box-admin">
            <div className="title-box">
              <p>Cadastrar novo usuário</p>
            </div>
            <div className="formulario-usuario">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div>
                    <input
                      placeholder="Nome completo usuário"
                      type="text"
                      id="nome"
                      name="nome"
                      value={dados.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <input
                      placeholder="E-mail"
                      type="email"
                      id="email"
                      name="email"
                      value={dados.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <input
                      placeholder="Senha forte"
                      type="text"
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
                    <select
                      id="tipo"
                      name="tipo"
                      value={dados.tipo}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione um tipo de usuário</option>
                      <option value="normal">Normal</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    {mostrarPontoColeta && (
                      <div className="form-row">
                        <div>
                          <select
                            id="pontoColetaId"
                            name="pontoColetaId"
                            value={dados.pontoColetaId}
                            onChange={handleChange}
                            required
                          >
                            <option value="">
                              Selecione um ponto de coleta
                            </option>
                            {pontosColeta.map((ponto) => (
                              <option key={ponto.id} value={ponto.id}>
                                {ponto.nomePonto}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
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

export default CadastrarUsuario;
