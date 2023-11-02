export function GetOrders(){
    const token: string = localStorage.getItem("token")!;
    console.log(token);
    return(fetch("https://burger-queen-api-mock-h9bp.onrender.com/orders",{
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
  console.log(GetOrders)
