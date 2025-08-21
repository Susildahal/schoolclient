
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
   // ensure we treat the stored value as a boolean-like string
   const flag = localStorage.getItem("flag") === "true";

   
  return flag ? children : <Navigate to="/login" replace />;
};
export default PrivateRoutes;