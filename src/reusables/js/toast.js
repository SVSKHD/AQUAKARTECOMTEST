import { toast } from "react-hot-toast";
import {
  BiMessageSquareCheck,
  BiMessageSquareX,
  BiInfoCircle,
} from "react-icons/bi";

const AquaToast = (message, type) => {
  let icon;
  let backgroundColor;

  switch (type) {
    case "success":
      icon = <BiMessageSquareCheck size={40} />;
      backgroundColor = "#539165";
      break;
    case "error":
      icon = <BiMessageSquareX size={40} />;
      backgroundColor = "#FF0000";
      break;
    case "info":
      icon = <BiInfoCircle size={40} />;
      backgroundColor = "#0077B6";
      break;
    default:
      icon = null;
      backgroundColor = "#00425A";
  }

  toast(message, {
    icon,
    style: {
      color: "#FFFFFF",
      backgroundColor,
      width: "300px",
      fontSize: "0.9rem",
      borderRadius: "32px",
    },
    duration: 5000,
    render: ({ t }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{ marginLeft: "auto" }}
        >
          Dismiss
        </button>
      </div>
    ),
  });
};

export default AquaToast;
