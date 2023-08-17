export function GetUsers(){
  const token: string = localStorage.getItem("token")!;
  console.log(token);
  return(fetch("http://localhost:8080/users",{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
    })
    .then(response=>{
      return response.json();
    })
    .catch(error=>{
      console.error("red error",error)
    })
  )
}
console.log(GetUsers)