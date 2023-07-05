import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarUser from "../../../components/SidebarUser";
import "./style.css";
import BoxTitleSection from "../../../components/BoxTitleSection";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../../../utils/axiosWithAuth";

const CadastrarDoacao = () => {
    const [tamanhos, setTamanhos] = useState([]);
    const [cadastroConfirmado, setCadastroConfirmado] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [cadastroEfetuado, setCadastroEfetuado] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const usuarioId = localStorage.getItem("usuarioId");
    //     const userType = localStorage.getItem("usuarioTipo");

    //     if (!token || !usuarioId) {
    //         navigate("/login");
    //     } else if (userType !== "normal") {
    //         navigate("/unauthorized");
    //     }
    // }, []);

    const handleCadastrar = async () => {
        const usuarioId = localStorage.getItem("usuarioId");
        const tipo = document.getElementById("tipo").value;
        const tamanho = document.getElementById("tamanho").value;
        const genero = document.getElementById("genero").value;
        const quantidade = parseInt(document.getElementById("quantidade").value, 10);

        if (!tipo || !tamanho || !genero || !quantidade) {
            alert("Preencha todos os campos!");
            return;
        }

        if (parseInt(quantidade) < 1) {
            alert("A quantidade deve ser maior ou igual a 1!");
            return;
        }

        try {
            await buscarProdutos(usuarioId, tipo, tamanho, genero, quantidade);
        } catch (error) {
            console.error("Ocorreu um erro ao buscar os produtos:", error);
        }
    };

    const buscarProdutos = async (usuarioId, tipo, tamanho, genero, quantidade) => {
        const response = await axiosWithAuth().post(
            "https://localhost:7243/api/produtos/buscar",
            {
                usuarioId: usuarioId,
                tipo: tipo,
                tamanho: tamanho,
                genero: genero,
            }
        );

        const resultados = response.data.$values || [];
        if (resultados.length > 0) {
            const produtoEncontrado = resultados[0];
            const item = {
                usuarioId: usuarioId,
                tipo: produtoEncontrado.tipo,
                tamanho: produtoEncontrado.tamanho,
                genero: produtoEncontrado.genero,
                estoque: produtoEncontrado.estoque,
                quantidade: parseInt(quantidade),
                produtoId: produtoEncontrado.id,
            };

            setItemSelecionado(item);
            setCadastroConfirmado(true);
            setCadastroEfetuado(false);
        } else {
            console.log("Nenhum produto encontrado!");
            await adicionarProduto(usuarioId, tipo, tamanho, genero, quantidade);
        }
    };

    const adicionarProduto = async (usuarioId, tipo, tamanho, genero, quantidade) => {
        try {
            await axiosWithAuth().post("https://localhost:7243/api/produtos/adicionar", {
                usuarioId: usuarioId,
                tipo: tipo,
                tamanho: tamanho,
                genero: genero,
                estoque: 0,
            });
            console.log("Novo produto adicionado com sucesso!");
            await buscarProdutos(usuarioId, tipo, tamanho, genero, quantidade);
        } catch (error) {
            console.error("Ocorreu um erro ao adicionar o novo produto:", error);
        }
    };

    const handleCancelarCadastro = () => {
        setCadastroConfirmado(false);
        setItemSelecionado(null);
    };

    const confirmarCadastro = async () => {
        try {
            const response = await axiosWithAuth().post(
                "https://localhost:7243/api/doacoes/entradadoacao",
                {
                    produtoId: itemSelecionado.produtoId,
                    quantidade: itemSelecionado.quantidade,
                }
            );

            setCadastroConfirmado(false);
            setCadastroEfetuado(true);
        } catch (error) {
            console.error("Ocorreu um erro ao confirmar o cadastro:", error);
        }
    };

    return (
        <div className="cadastrar-doacao">
            <SidebarUser />
            <main>
                <BoxTitleSection titulo={"Cadastrar doaçao"} />
                <div>
                    <h2>Preencha todos os campos para cadastrar uma nova doação:</h2>
                </div>
                <div className="box-busca-cadastro">
                    <div className="box-header-busca-cadastro">
                        <p>Novo item:</p>
                    </div>
                    <div className="box-resultado">
                        <div className="container-select-cadastro">
                            <div className="select-cadastro">
                                <label htmlFor="tipo">Tipo:</label>
                                <select id="tipo">
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
                            <div className="select-cadastro">
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
                            <div className="select-cadastro">
                                <label htmlFor="genero">Gênero:</label>
                                <select id="genero">
                                    <option value="">Selecionar</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="U">Unissex</option>
                                </select>
                            </div>
                            <div className="select-cadastro">
                                <label htmlFor="quantidade">Quantidade:</label>
                                <input type="number" id="quantidade" defaultValue="1" />
                            </div>
                            <div className="select-cadastro btn-cadastro">
                                <button
                                    type="button"
                                    className="btn-buscar-cadastrar"
                                    onClick={handleCadastrar}
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                        {cadastroConfirmado && itemSelecionado && (
                            <div className="doacao-confirmada">
                                <h2>CONFIRMAR CADASTRO DE DOAÇÃO!</h2>
                                <p>Você está prestes a cadastrar o seguinte item:</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Tamanho</th>
                                            <th>Gênero</th>
                                            <th>Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{itemSelecionado.tipo}</td>
                                            <td>{itemSelecionado.tamanho}</td>
                                            <td>
                                                {itemSelecionado.genero === "M"
                                                    ? "Masculino"
                                                    : itemSelecionado.genero === "F"
                                                        ? "Feminino"
                                                        : "Unissex"}
                                            </td>
                                            <td>{itemSelecionado.quantidade}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="botoes-confirmacao">
                                    <button onClick={handleCancelarCadastro}>Cancelar</button>
                                    <button onClick={confirmarCadastro}>Confirmar</button>
                                </div>
                            </div>
                        )}
                        {cadastroEfetuado && (
                            <div className="mensagem-doacao-efetuada">
                                <p>ITEM ABAIXO CADASTRADO COM SUCESSO!</p>

                                <div className="lista-resultado-busca">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Tipo</th>
                                                <th>Tamanho</th>
                                                <th>Gênero</th>
                                                <th>Estoque Atual</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{itemSelecionado.tipo}</td>
                                                <td>{itemSelecionado.tamanho}</td>
                                                <td>
                                                    {itemSelecionado.genero === "M"
                                                        ? "Masculino"
                                                        : itemSelecionado.genero === "F"
                                                            ? "Feminino"
                                                            : "Unissex"}
                                                </td>
                                                <td>
                                                    {itemSelecionado.estoque + itemSelecionado.quantidade}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CadastrarDoacao;
