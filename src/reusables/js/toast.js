import { toast } from 'react-hot-toast';
import { BiMessageSquareCheck,BiMessageSquareX , BiInfoCircle } from 'react-icons/bi';

const AquaToast = (message, type) => {
  let icon;
  let backgroundColor;

  switch (type) {
    case 'success':
      icon = <BiMessageSquareCheck size={40} />;
      backgroundColor = '#539165';
      break;
    case 'error':
      icon = <BiMessageSquareX size={40} />;
      backgroundColor = '#FF0000';
      break;
    case 'info':
      icon = <BiInfoCircle size={40} />;
      backgroundColor = '#0077B6';
      break;
    default:
      icon = null;
      backgroundColor = '#00425A';
  }

  toast(message, {
    icon,
    style: {
      border: '1px solid #713200',
      padding: '10px',
      color: '#FFFFFF',
      backgroundColor,
      width:'350px',
      fontSize:'1.2rem'
    },
    duration: 2000,
  });
};

export default AquaToast;