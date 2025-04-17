import Swal, { SweetAlertIcon } from "sweetalert2";

interface IsConfirm {
  title: string;
  text?: string;
  icon: SweetAlertIcon;
}
function IsConfirm({ title, text, icon }: IsConfirm) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#8794BF",
    cancelButtonColor: "#cc5b5b",
    confirmButtonText: "確認",
    cancelButtonText: "取消",
  });
}

export default IsConfirm;
