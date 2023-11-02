export function PostProducts(Product: object){
    const token: string = localStorage.getItem("token")!;
    console.log(token);
    return(fetch("https://burger-queen-api-mock-h9bp.onrender.com/products",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
              },
      body: JSON.stringify(Product),
      })
      .then(response=>{
        return response;
      })
      .catch(error=>{
        console.error("red error",error);
        throw error;
      })
    )
  }
  console.log(PostProducts)