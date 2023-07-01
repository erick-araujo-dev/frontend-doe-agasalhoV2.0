import SidebarUser from '../../../components/SidebarAdmin';
import logo_home from "../../../assets/images/logo-doe-agasalho.png";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomePageAdmin = () => {
    const usuarioNome = localStorage.getItem("usuarioNome")
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

    return(
        <div className="home-page">
            <SidebarUser/>
            <div className='box-home'>
                <div className="content-box-home">
                    <img src={logo_home} alt="Logo Doe Agasalho" title="Logo Doe Agasalho" className='logo-home'/>
                    <p>Olá, {usuarioNome}</p>
                    <p>
                        Bem vindo(a) ao sistema de gerencimanto de doações da Doe Agasalho
                    </p>
                    <p>
                        Essa é a pagina inicial de administrador do sistema, aqui você poderá gerenciar os usuarios com acesso ao sistema.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomePageAdmin;