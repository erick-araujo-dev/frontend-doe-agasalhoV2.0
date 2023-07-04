import logo_sidebar from "../../assets/images/logo-doe-agasalho.png";
import { House, PlusCircle, MagnifyingGlass, SignOut, Pencil} from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/helpers";

const SidebarAdmin = () => {
    const navigate = useNavigate();
    
    const handleLogoutClick = () => {
        handleLogout(navigate);
      };

    return (
        <div className="sidebar">
            <aside>
                <div>
                    <img
                        src={logo_sidebar}
                        alt="Logo Doe Agasalho"
                        title="Logo Doe Agasalho"
                        className="logo-sidebar"
                    />
                </div>
                <nav>
                    <ul>
                        <span>Menu</span>
                        <li  className={location.pathname === "/homeadmin" ? "active-route" : ""}>
                            <i>
                                <House />
                            </i>
                            <Link
                                to="/homeadmin"
                               
                            >
                                Página Inicial
                            </Link>
                        </li>
                        <li className={location.pathname === "/editarpontocoleta" ? "active-route" : ""}>
                            <i>
                                <Pencil />
                            </i>
                            <Link
                                to="/editarpontocoleta"
                                
                            >
                                Editar Ponto de Coleta
                            </Link>
                        </li>
                        <li className={location.pathname === "/cadastrarpontocoleta" ? "active-route" : ""}>
                            <i>
                                <PlusCircle />
                            </i>
                            <Link
                                to="/cadastrarpontocoleta"
                                
                            >
                                Cadastrar Ponto de Coleta
                            </Link>
                        </li>
                        <li className={location.pathname === "/editarusuario" ? "active-route" : ""}>
                            <i>
                                <Pencil />
                            </i>
                            <Link
                                to="/editarusuario"
                                
                            >
                                Editar Usuário
                            </Link>
                        </li>
                        <li className={location.pathname === "/cadastrarusuario" ? "active-route" : ""}>
                            <i>
                                <PlusCircle />
                            </i>
                            <Link
                                to="/cadastrarusuario"
                                
                            >
                                Cadastrar Usuário
                            </Link>
                        </li>
                    </ul>

                    <ul>
                        <span>Geral</span>
                        <li onClick={handleLogoutClick}>
                            <i>
                                <SignOut /> 
                            </i>
                            <a>Sair</a>
                            
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default SidebarAdmin;
