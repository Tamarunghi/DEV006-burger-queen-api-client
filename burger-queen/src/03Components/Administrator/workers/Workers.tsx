import Swal from "sweetalert2";
import { deleteUsers } from "../../../02App/deleteUser";
import { GetUsers } from "../../../02App/getUsers";
import add from "../../../04Images/add.png";
import edit from "../../../04Images/edit.png";
import trashCan from "../../../04Images/trashCan.png";
import { User } from "../../Interfaces";
import { EditPopup } from "./EditPopup";
import { useEffect, useState } from "react";
import { AddUsersPopup } from "./AddUsersPopup";

export const Workers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = () => {
    GetUsers()
      .then((data) => {
        console.log("data", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("error", error);
      });
    console.log("se actuailzi");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    console.log("agregar");
    AddUsersPopup({ fetchUsers })
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.error("se presento un error", error);
      });
  };
  const handleEdit = (user: User): void => {
    setSelectedUser(user);
  };
  const handleDelete = (user: User): void => {
    Swal.fire({
      title: "Desea eliminar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8A8A",
      cancelButtonColor: "#C1D78F",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
        deleteUsers(user.id)
          .then((resolve) => {
            console.log("eliminado");
            fetchUsers();
            return resolve;
          })
          .catch((error) => {
            console.error("error", error);
          });
      }
    });
  };

  return (
    <>
      <div className="flex justify-center">
        <img src={add} className="h-[90px] w-[90px]" onClick={handleAdd} />
      </div>
      {users.map((user) => (
        <article
          key={user.id}
          className="bg-press grid grid-cols-4 h-auto flex flex-col text-[1.1rem] p-[20px] mb-[25px] text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25  shadow-notPressShadow opacity-70"
        >
          <div className="text-xl col-span-2">
            <div>
              <p>
                ROL:<span>{user.role}</span>
              </p>
            </div>
            <div>
              <p>
                EMAIL:<span>{user.email}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={edit}
              className="h-[60px] w-[60px] "
              onClick={() => handleEdit(user)}
            />
          </div>
          <div className="  bg-minusButtom rounded-full flex justify-center">
            <img
              src={trashCan}
              className="h-[50px] w-[40px] flex justify-center"
              onClick={() => handleDelete(user)}
            />
          </div>
        </article>
      ))}
      {selectedUser && (
        <EditPopup user={selectedUser} fetchUsers={fetchUsers} />
      )}
    </>
  );
};
