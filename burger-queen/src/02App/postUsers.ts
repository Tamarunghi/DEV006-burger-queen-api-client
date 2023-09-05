export function postUsers(email:string, password:string, role:string){
    const token: string = localStorage.getItem("token")!;
    console.log(token);
    return(fetch("http://localhost:8080/users",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
              },
      body: JSON.stringify(
        {
            "email": email,
            "password": password,
            "role": role,
          }
      ),
      })
      .then(response=>{
        return response.json();
      })
      .catch(error=>{
        console.error("red error",error)
      })
    )
  }
  console.log(postUsers)