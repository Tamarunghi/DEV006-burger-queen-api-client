
export function patchUsers(id: number, email:string, password: string, role:string){
    const token: string = localStorage.getItem("token")!;
    console.log(token);
    return(fetch(`https://burger-queen-api-mock-h9bp.onrender.com/users/${id}`,{
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
       return response;
      })
      .catch(error=>{
        console.error("red error",error)
      })
    )
  }
