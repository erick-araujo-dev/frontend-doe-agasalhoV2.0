import React, { useState } from "react";
import './style.css';
import { buscarEnderecoPorCep } from "../../utils/helpers";
import axiosWithAuth from "../../utils/axiosWithAuth";

const FormEditarUsuario = ({ usuario, mostrarFormulario }) => {


  const [formData, setFormData] = useState({
    id: usuario.id || "",
    nome: usuario.nome || "",
    tipo: usuario.tipo || "",
    login: usuario.login || "",
    senha: usuario.senha || "",
    cep: usuario.cep || "",
    rua: usuario.rua || "",
    numero: usuario.numero || "",
    complemento: usuario.complemento || "",
    bairro: usuario.bairro || "",
    cidade: usuario.cidade || "",
    estado: usuario.estado || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosWithAuth().put(
        "https://localhost:7243/api/usuarios/atualizar",
        formData
      );
      
      mostrarFormulario();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao editar o usuário", error);
    }
  };

  const buscarEndereco = async () => {
    await buscarEnderecoPorCep(formData.cep, setFormData);
  };

  const handleCancelar = () => {
    mostrarFormulario();
  };

  return (
    <div className="cadastrar-usuario">
      <main>
        <div>
          <div className="box-admin">
            <div className="title-box">
              <p>Editar usuário:</p>
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
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <select
                      id="tipo"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="Admin">Admin</option>
                      <option value="Normal">Normal</option>
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
                      value={formData.login}
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
                      value={formData.senha}
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
                      value={formData.cep}
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
                      value={formData.rua}
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
                      value={formData.numero}
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
                      value={formData.complemento}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      placeholder="Bairro"
                      type="text"
                      id="bairro"
                      name="bairro"
                      value={formData.bairro}
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
                      value={formData.cidade}
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
                      value={formData.estado}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="btn-editar-voltar">
                    <button className="btn-cadastrar-usuario" onClick={handleCancelar}>
                      Voltar
                    </button>
                    <button className="btn-cadastrar-usuario" type="submit">
                      Editar
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormEditarUsuario;
