import Swal, { SweetAlertIcon } from "sweetalert2";

interface MixinModelProp {
  icon: SweetAlertIcon;
  title: string;
  timer: number;
}

function MixinModel({ icon, title, timer = 3000 }: MixinModelProp) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
}

export default MixinModel;
