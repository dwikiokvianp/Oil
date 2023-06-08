import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const addNotification = async (
  type: "success" | "error" | "warning" | "info",
  message: string
) => {
  await Toast.fire({
    icon: type,
    title: message,
  });
};

export const addNotificationWithConfirm = async () => {
  return await Swal.fire({
    title: "Are you sure you want to logout?",
    text: "You will be logged out of the system!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!",
  });
};
