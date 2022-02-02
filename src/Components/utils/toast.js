import { toast } from 'react-toastify';


export const successToast = (message, time = 15000) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const infoToast = (message, time = 15000) => {
  toast.info(message, {
    position: 'top-left',
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

export const warningToast = (message, time = 15000) => {
  toast.warning(message, {
    position: 'top-left',
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

export const errorToast = (message, time = 15000) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: time,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};