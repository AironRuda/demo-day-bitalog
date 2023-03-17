import Swal from 'sweetalert2';

export const successAlert = (text: string) => {
  Swal.fire({
    text: text,
    icon: 'success',
    iconColor: '#31C48D',
    confirmButtonColor: '#31C48D',
    confirmButtonText: 'Aceptar',
  });
};

export const errorAlert = (text: string) => {
  Swal.fire({
    text: text,
    icon: 'error',
    iconColor: '#B4103C',
    confirmButtonColor: '#B4103C',
    confirmButtonText: 'Aceptar',
  });
};

export const confirmAlert = async (text: string) => {
  return await Swal.fire({
    title: '¿Deseas continuar?',
    text: text,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Confirmar',
    confirmButtonColor: '#31C48D',
    icon: 'info',
    iconColor: '#31C48D',
  });
};
