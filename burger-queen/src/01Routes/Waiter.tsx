import React, { useEffect, useState } from "react";
import { GetProducts } from "../02App/getProduct";
import { OrderSelectionItem } from "../03Components/OrderSelectionItem";
import { AddedToCart, TotalAddedToCart } from "../03Components/AddedToCart";
import { LoggedUserAndExist } from "../03Components/LoggedUserAndExist";
import {LogoPng} from "../03Components/logoComponent"
import { Background } from "../03Components/Background";
import { DeletePopup } from "../03Components/DeletePopup";


export const Waiter: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productType, setProductType] = useState("Desayuno");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [productDelete, setProductDelete] =useState (false);
 

  useEffect(() => {
    GetProducts()
      .then((data) => {
        const productsWithClick = data.map((product:any)=>({...product, clicks:0}));
        setProducts(productsWithClick);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);

  const handleSelectProductType = (type: string) => {
    setProductType(type);
  };
  const handleAddToCart = (product: any) => {
    // Verifica si el producto ya está en el carrito
    const existingProduct = cartItems.find((item) => item.id === product.id);
    
    if (existingProduct) {
      // Si el producto ya está en el carrito, incrementar su contador de clics
      setCartItems((prevCartItems) => {
       const updatedCartItems = prevCartItems.map((item) =>
        item.id === product.id ? { ...item, clicks: item.clicks + 1 } : item
      );
        return updatedCartItems;
      });
    } else {
      // Si el producto no está en el carrito, agregarlo con un contador de clics inicial de 1
      setCartItems((prevCartItems) => [...prevCartItems, { ...product, clicks: 1}]);
    }
  };
  const handleIncremetQuantity = (productId: string) =>{
    setCartItems((prevCartItems)=>{
      const updatedCartItems = prevCartItems.map((item)=>
      item.id === productId ? {...item, clicks: item.clicks+1}:item
      );
      return updatedCartItems
    });
  }
  const handleDecremetQuantity = (productId: string) =>{
    setCartItems((prevCartItems)=>{
      const updatedCartItems = prevCartItems.map((item)=>
      item.id === productId ? {...item, clicks: Math.max(0,item.clicks-1)}:item
      );
      if(updatedCartItems.find((item) => item.id === productId)?.clicks === 0){
        return updatedCartItems.filter((item) => item.id !== productId);
      }else{
        return updatedCartItems 
      }
      
    });
  }

  const handleDeleteCartItem = (productId: string) => {
    DeletePopup()
    .then((result)=>{
if (result.isConfirmed){
  setCartItems((prevCartItems) => {
    const updatedCartItems = prevCartItems.filter((item) => item.id !== productId);
    return updatedCartItems;
  });
  setProductDelete(true); 
}
else if (result.isDenied) {
  // El usuario hizo clic en el botón cancelar o cerró el SweetAlert
  console.log('Eliminación cancelada');
}
 })
    .catch((error)=>{
      console.log(error)
    })
  
  };

  return (
    <article className="h-[97vh] flex flex-col m-[20px]">
      {/* ---Header(LOGO + MESERO)--- */}
      <header className=" z-1 w-[100%] h-[25%] mb-[20px] flex flex-row">
    <LogoPng/>
        <div className="absolute top-0 right-0">
          <LoggedUserAndExist/>
          <label
          id="waiterPg"
          className="font-bold text-[90px] text-crema border-brownText drop-shadow-[4px_4px_0.5px_#65362A]"
        >
          MESERO
        </label>
        </div>
      </header>

      {/* ---Main section--- */}
      <main id="content" className=" z-1 h-[100%] w-[100%]">
        {/* ---Desayuno - Almuerzo/Cena--- */}
        <section
          id="desayunoOalmuerzoCena"
          className=" h-[10%] w-[100%] flex flex-row justify-end"
        >
          <div
            className={`h-[100%] w-[250px] bg-crema rounded-tl-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Desayuno"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectProductType("Desayuno")} // Manejador para seleccionar desayuno
          >
            <label>Desayuno</label>
          </div>
          <div
            className={`h-[100%] w-[250px] bg-crema rounded-tr-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Almuerzo"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectProductType("Almuerzo")} // Manejador para seleccionar Almuerzo
          >
            <label>Almuerzo/Cena</label>
          </div>
        </section>

        {/* ---Order&Menu--- */}
        <section id="menuYCompra" className=" h-[90%] w-[100%] bg-crema p-[4%]">
          {/* ---Name + Table--- */}
          <div
            id="nameAndTable"
            className="h-[10%] w-[100%] p-[1%] flex flex-row justify-evenly items-center gap-1"
          >
            <label>Nombre:</label>
            <input
              type="text"
              className="bg-skin h-[50%] w-[40%] rounded-5"
            ></input>
            <label>Mesa:</label>
            <input
              type="text"
              className="bg-skin h-[50%] w-[40%] rounded-5"
            ></input>
          </div>

          {/* ---Order Selection--- */}
          <div
            id="orderSelection"
            className="h-auto w-[100%] p-[1%] flex flex-wrap justify-center justify-evenly text-center gap-y-4"
          >
            {/* ---Menu/Cart--- */}
            {products
              .filter((product) => product.type === productType)
              .map((product) => (
                <OrderSelectionItem 
                  key={product.id}
                  name={product.name}
                  price={product.price}
                   onClick={() => {
                    handleAddToCart(product);
                  }}
                />
              ))}
          </div>

          {/* ---Shopping Cart--- */}

          <div id="cart" className="h-auto w-[100%] p-[5%] text-[1.5rem] font-bold">
            {/* ---Titles--- */}
            <div id="titles" className="h-[50px] w-[100%] grid grid-cols-10 gap-1 text-center">
              <div id="product" className="bg-yellow col-span-3 rounded-tl-[15px]">
                Producto
              </div>
              <div id="quantity" className="bg-yellow col-span-4">
                Cantidad
              </div>
              <div id="price" className="bg-yellow col-span-2 rounded-tr-[15px]" >
                Precio
              </div>
              <div id="delete" className="col-span-1"></div>
            </div>
            
            {/* ---Products added--- */}
            {cartItems.map((product, id) => (
              <AddedToCart
                key={id}
                name={product.name}
                clicks={product.clicks}
                price={product.price}
                Increment={()=> handleIncremetQuantity(product.id)}
                Decrement={()=> handleDecremetQuantity(product.id)}
                Delete={()=> handleDeleteCartItem(product.id)}
              />
            ))}
            {/* ---Total--- */}
            <TotalAddedToCart cartItems={cartItems}
             
            />
          </div>

          {/* ---Send Buttom--- */}
          <div
            id="SendButtom"
            className="h-[10%] w-[100%] flex justify-center items-center"
          >
            <button
              type="submit"
              className="bg-colorButton h-[65px] w-[500px] items-center rounded-[45px]  font-bold text-brownText text-[1.5rem]"
            >
              Enviar a Cocina
            </button>
          </div>
        </section>
      </main>

      {/* ---Background--- */}
            <Background/>
    </article>
  );
};
