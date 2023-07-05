 //Funcao para fazer logout
export const handleLogout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuarioTipo");
  localStorage.removeItem("usuarioId");
  localStorage.removeItem("usuarioNome");

  navigate("/login");
};

// Funcao para decrementar a quantidade do item
export const handleReduce = (item) => {
  if (item.quantidade > 1) {
    item.quantidade--;
  }
};

// Funcao para incrementar a quantidade do item
export const handleIncrease = (item) => {
  item.quantidade++;
};

// Funcao para atualizar a quantidade do item quando o valor do input for alterado
export const handleAmountChange = (item, value) => {
  const quantidade = parseInt(value, 10);
  if (!isNaN(quantidade) && quantidade >= 1) {
    item.quantidade = quantidade;
  }
};