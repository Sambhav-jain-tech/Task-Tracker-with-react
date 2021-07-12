import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
const Button = ({ color, text, onClick }) => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === '/' && (<button
        onClick={onClick}
        style={{ backgroundColor: color }}
        className="btn"
      >
        {text}
      </button>)}
    </div>
  );
};

Button.defaultProps = {
  color: "steelblue",
};

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  inClick: PropTypes.func,
};

export default Button;
