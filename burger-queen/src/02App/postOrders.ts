export function PostOrders(orderData: object){
  const token: string = localStorage.getItem("token")!;
  console.log(token);
  return(fetch("https://burger-queen-api-mock-h9bp.onrender.com/orders",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
            },
    body: JSON.stringify(orderData),
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