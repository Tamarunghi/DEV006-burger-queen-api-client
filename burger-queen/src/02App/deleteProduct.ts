

export function deleteProduct(id: number){
    const token: string = localStorage.getItem("token")!;
    console.log(token);
    return(fetch(`https://burger-queen-api-mock-h9bp.onrender.com/products/${id}`,{
         method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
              },
      
      })
      .then(response=>{
        console.log("se elimino , validar")
        return response.json();
      })
      .catch(error=>{
        console.error("red error",error)
      })
    )
  }
