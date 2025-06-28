import { useToast } from 'vue-toastification';

const toast = useToast();

export const toastSuccess = (message) => {
  toast.success(message, {
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    style: {
      background: '#e6ffed',
      border: '1px solid #00c853',
      color: '#006837',
    },
  });
};

export const toastError = (message) => {
  toast.error(message, {
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    style: {
      background: '#ffebee',
      border: '1px solid #d32f2f',
      color: '#b71c1c',
    },
  });
};

export const toastWarning = (message) => {
  toast.warning(message, {
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    style: {
      background: '#fff8e1',
      border: '1px solid #ffa000',
      color: '#e65100',
    },
  });
};
