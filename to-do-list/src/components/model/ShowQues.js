import Swal from "sweetalert2";
import ShowSwal from "./ShowSwal";
const ShowQues = ({ title, message, handleConfirmed }) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const yes = await handleConfirmed();
      if (yes) {
        ShowSwal({
          isS: true,
          message: "成功刪除",
        });
      }
    }
  });
};

export default ShowQues;
