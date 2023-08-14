import Swal from "sweetalert2";
import styles from "./SuccessAlert.module.css";
export const SuccessAlert = () => {
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  toast.fire({
    icon: "success",
    title: `<span style="font-size: 1.5rem;">Pedido enviado a cocina</span>`,
    customClass: {
      //   title: styles["custom-title"], // Apply custom styles here
      icon: styles["custom-icon"], //   container: styles["custom-toast"],
    },
  });
};
