import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoutes = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/signin");
    }
  }, [navigate, user]);

  return <>{children}</>;
};

export default ProtectRoutes;
