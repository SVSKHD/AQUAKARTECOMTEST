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
      icon = <BiMessageSquareCheck size={20} />;
      backgroundColor = "#539165";
      // Directly call toast.success here
      toast.success(message, {
        icon,
        duration: 2000, // Adjust duration as needed
        position: "top-center",
        style: {
          borderRadius: "20px",
          padding: "10px",
          backgroundColor,
          color: "white",
        },
      });
      break;
    case "error":
      icon = <BiMessageSquareX size={20} />;
      backgroundColor = "#FF0000";
      // Directly call toast.error here
      toast.error(message, {
        icon,
        duration: 6000, // Adjust duration as needed
        position: "top-center",
        style: {
          borderRadius: "20px",
          padding: "10px",
          backgroundColor,
          color: "white",
        },
      });
      break;
    case "info":
      icon = <BiInfoCircle size={20} />;
      backgroundColor = "#0077B6";
      // Directly call toast.info here
      toast(message, {
        icon,
        duration: 6000, // Adjust duration as needed
        position: "top-center",
        style: {
          borderRadius: "20px",
          padding: "10px",
          backgroundColor,
          color: "white",
        },
      });
      break;
    default:
      // Handle the default case, possibly with toast.info or another method
      toast(message, {
        // Using generic toast for cases not covered by success, error, or info
        duration: 2000, // Adjust duration as needed
        position: "top-center",
        style: {
          borderRadius: "20px",
          padding: "10px",
          backgroundColor: "#00425A", // Default background color
          color: "white",
        },
      });
  }
};

export default AquaToast;
