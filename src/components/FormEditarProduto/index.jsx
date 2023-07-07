import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "./style.css"

const FormEditarProduto = ({ produto, mostrarFormulario }) => {
  const [formData, setFormData] = useState({
    caracteristica: produto.caracteristica || "",
    tamanho: produto.tamanho || "",
    tipo: produto.tipo || "",
    genero: produto.genero || "",
  });

  useEffect(() => {
  }, []);

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
        `http://localhost:5059/api/products/${produto.id}/updateproduct`,
        formData
      );
      mostrarFormulario();
      window.location.reload();
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

  const handleCancelar = () => {
    mostrarFormulario();
  };

  return (
    <div className="cadastrar-usuario">
      <main>
        <div>
          <div className="box-busca-cadastro">
            <div className="box-header-busca-cadastro">
              <p>Editar produto:</p>
            </div>
            <div className="formulario-usuario">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div>
                    <input
                      placeholder="Tipo"
                      type="text"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div >
                    <input
                      placeholder="Estilo"
                      type="text"
                      name="caracteristica"
                      value={formData.caracteristica}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                  <input
                      placeholder="Tamanho"
                      type="text"
                      name="tamanho"
                      value={formData.tamanho}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                  <input
                      placeholder="Gênero"
                      type="text"
                      name="genero"
                      value={formData.genero === "M"
                      ? "Masculino"
                      : item.genero === "F"
                      ? "Feminino"
                      : "Unissex"}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="btn-editar-voltar">
                  <button
                    className="btn-cadastrar-usuario"
                    onClick={handleCancelar}
                  >
                    Voltar
                  </button>
                  <button className="btn-cadastrar-usuario" type="submit">
                    Alterar
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

export default FormEditarProduto;
