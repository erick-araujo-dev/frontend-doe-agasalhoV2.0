import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const verifyAuthentication = () => {
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
  }, [navigate]);
};

export default verifyAuthentication;
