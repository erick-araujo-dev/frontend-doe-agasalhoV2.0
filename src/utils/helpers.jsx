import axios from "axios";
import { useNavigate } from "react-router-dom";

export const handleTipoChange = (event, setTamanhos) => {
  const tipo = event.target.value;

  let sizes = [];

  if (tipo === "Blusa" || tipo === "Jaqueta" || tipo === "Moletom" || tipo === "Camiseta" || tipo === "Camisa" ) {
    sizes = ["P", "M", "G", "GG"];
  } else if (tipo === "Calça") {
    sizes = ["40", "42", "44", "46", "48", "50", "52", "54", "56"];
  } else if (tipo === "Calçado") {
    sizes = [
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
    ];
  } else if (tipo === "Gorro" || tipo === "Cachecol") {
    sizes = ["Único"];
  } else if (tipo === "Meias") {
    sizes = ["Único", "P", "M", "G"];
  } else if (tipo === "Cobertor") {
    sizes = ["Solteiro", "Casal", "Queen", "King"];
  }

  setTamanhos(sizes);
};
  

export const buscarEnderecoPorCep = async (cep, setDados) => {
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${cep}/json/`
    );
    const data = response.data;
    setDados((prevDados) => ({
      ...prevDados,
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf,
      cep: cep
    }));
  } catch (error) {
    console.error("Erro ao buscar o CEP", error);
  }
};

export const handleLogout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuarioTipo");
  localStorage.removeItem("usuarioId");
  localStorage.removeItem("usuarioNome");

  navigate("/login");
};

