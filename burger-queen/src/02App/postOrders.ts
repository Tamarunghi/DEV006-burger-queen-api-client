export function PostOrders(){
    const token: string = localStorage.getItem("token")!;
    console.log(token);
    return(fetch("http://localhost:8080/orders",{
      method: 'POST',
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
  console.log(PostOrders)