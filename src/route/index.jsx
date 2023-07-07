import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageUser from "../pages/Normal/HomePageUser";
import LoginPage from "../pages/LoginPage";
import BuscarDoacao from "../pages/Normal/BuscarDoacao";
import CadastrarDoacao from "../pages/Normal/CadastrarDoacao";
import HomePageAdmin from "../pages/Admin/HomePageAdmin";
import EditarPontoColeta from "../pages/Admin/EditarPontoColeta";
import CadastrarPontoColeta from "../pages/Admin/CadastrarPontoColeta";
import EditarUsuario from "../pages/Admin/EditarUsuario";
import CadastrarUsuario from "../pages/Admin/CadastrarUsuario";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import EditarUsername from "../pages/EditarUsername";
import AlterarSenha from "../pages/AlterarSenha";
import RelatorioDoacoes from "../pages/Admin/RelatorioDoacoes";



export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route exact path="/home" element={<HomePageUser />} />
        <Route exact path="/buscardoacao" element={<BuscarDoacao />} />
        <Route exact path="/cadastrardoacao" element={< CadastrarDoacao/>} />
        <Route exact path="/homeadmin" element={<HomePageAdmin />} />
        <Route exact path="/editarpontocoleta" element={<EditarPontoColeta />} />
        <Route exact path="/cadastrarpontocoleta" element={<CadastrarPontoColeta />} />
        <Route exact path="/editarusuario" element={<EditarUsuario />} />
        <Route exact path="/cadastrarusuario" element={<CadastrarUsuario />} />
        <Route exact path="/relatoriodoacoes" element={<RelatorioDoacoes />} />
        <Route exact path="/editarnome" element={<EditarUsername />} />
        <Route exact path="/alterarsenha" element={<AlterarSenha />} />
        <Route exact path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </BrowserRouter>
  );
}
