
import Swal from "sweetalert2";
export function patchUsers(id: number, email:string, password: string, role:string){
    const token: string = localStorage.getItem("token")!;
    console.log(token);
    return(fetch(`http://localhost:8080/users/${id}`,{
         method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
              },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
       
      }),
      })
      .then(response=>{
        //  if (response.status === 200) {
        //   Swal.fire({
        //     icon: "success",
        //     title: "Usuario editado con éxito",
        //     confirmButtonColor: "#C1D78F",
        //   });
        //   console.log("exitoosoooo")
                    
        //    } else {
                 
        //             Swal.fire({
        //               icon: "error",
        //               title: "Error al editar el usuario",
        //               confirmButtonColor: "#C1D78F",
        //             });
        //           }
        // console.log("status",response.status)
        return response;
      })
      .catch(error=>{
        console.error("red error",error)
      })
    )
  }
