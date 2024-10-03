import { useAuth } from "../../context/useAuth";
import { PropTypes } from "prop-types";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return null;
  }
  return <>{user ? children : <Navigate to="/" />}</>;
};

export default Protected;

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};
