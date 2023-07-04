import SidebarUser from '../../../components/SidebarAdmin';
import logo_home from "../../../assets/images/logo-doe-agasalho.png";
import verifyAuthentication from '../../../utils/verifyAuthentication';

const HomePageAdmin = () => {
    const usuarioNome = localStorage.getItem("usuarioNome")

    verifyAuthentication(); //verifica se o user esta autenticado

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