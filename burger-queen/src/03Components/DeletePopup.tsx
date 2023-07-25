import Swal, { SweetAlertResult } from "sweetalert2";

export const DeletePopup = (): Promise<SweetAlertResult<DeleteButton>> => {
  return Swal.fire<DeleteButton>({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });
};

interface DeleteButton {
  isConfirmed: boolean;
  isDenied: boolean;
}





