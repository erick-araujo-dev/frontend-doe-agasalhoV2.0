import SidebarUser from '../../../components/SidebarUser';
import logo_home from "../../../assets/images/logo-doe-agasalho.png";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomePageUser = () => {
    const usuarioNome = localStorage.getItem("usuarioNome")
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const usuarioId = localStorage.getItem("usuarioId");
        const userType = localStorage.getItem("usuarioTipo");

        if (!token || !usuarioId) {
            navigate("/login");
        } else if (userType !== "normal") {
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
                        Com esse sistema será possível gerenciar todas as movimentações de entrada e saída de doações da organização
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomePageUser;