import Swal from "sweetalert2";
/* 事件成功 || 失敗 */
const ShowSwal = ({ isS, message }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  if (isS) {
    Toast.fire({
      icon: "success",
      title: message,
    });
  } else {
    Toast.fire({
      icon: "error",
      title: message,
    });
  }
};

export default ShowSwal;
