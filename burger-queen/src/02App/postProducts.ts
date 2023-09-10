export function PostProducts(Product: object){
    const token: string = localStorage.getItem("token")!;
    console.log(token);
    return(fetch("http://localhost:8080/products",{
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