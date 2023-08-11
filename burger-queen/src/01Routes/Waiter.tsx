import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { GetProducts } from "../02App/getProduct";
import { PostOrders } from "../02App/postOrders";
import { LoggedUserAndExist } from "../03Components/LoggedUserAndExist";
import { DeletePopup } from "../03Components/Waiter/DeletePopup";
import { LogoPng } from "../03Components/logoComponent";
import { Background } from "../03Components/Background";
import { ICartItems, orderItems, orderData } from "../03Components/Interfaces";
import { GetOrders } from "../02App/getOrders";
import { InformationToList } from "../03Components/Waiter/InformationToList";
import { AddedToCart, TotalAddedToCart } from "../03Components/Waiter/AddedToCart";
import { OrderSelectionItem } from "../03Components/Waiter/OrderSelectionItem";


export const Waiter: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productType, setProductType] = useState("Desayuno");
  const [cartItems, setCartItems] = useState<ICartItems[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerTable, setcustomerTable] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    GetProducts()
      .then((data) => {
        const productsWithClick = data.map((product: any) => ({
          ...product,
          clicks: 0,
        }));
        console.log(data);
        setProducts(productsWithClick);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });

    GetOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

    const handleSelectProductType = (type: string) => {
    setProductType(type);
  };

  const handleInformation = () => {
    return orders.map((order) => (
      <InformationToList
        id={order.id}
        key={order.id}
        client={order.client}
        products={order.products}
        dateEntry={order.dateEntry}
        userId={order.userId}
        status={order.status}
      />
    ));
  };

  const orderItems: orderItems[] = cartItems.map((item) => ({
    qty: item.clicks,
    product: {
      id: item.id,
      name: item.name,
      price: item.price,
      type: item.type,
      dateEntry: item.dateEntry,
    },
  }));
  const orderData: orderData = {
    userId: localStorage.getItem("userId"),
    client: customerName,
    products: orderItems,
    status: "Pendiente",
    dateEntry: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };
  console.log(orderData);
  PostOrders(orderData)
    .then((response) => {
      console.log("se guardooo perro", response);
      return response;
    })
    .catch((error) => {
      console.error("error perro", error);
    });

  return (
    <article className="h-[97vh] hm:vw-[97vw] flex flex-col m-[20px]">
      {/* ---HEADER(LOGO + MESERO)--- */}
      <header className=" z-2 w-[100%] h-[20%] hm:[10%] mb-[20px] flex items-center justify-between">
        <LogoPng />
        <div className="w-[100%] h-[100%] flex flex-col items-end">
          <LoggedUserAndExist />
          <h1
            id="waiterPg"
            className="font-bold text-[90px] text-crema border-brownText drop-shadow-[4px_4px_0.5px_#65362A] hm:text-[75px] hm:mt-[-17px]"
          >
            MESERO
          </h1>
        </div>
      </header>

      {/* ---MAIN SECTION--- */}
      <main id="content" className=" z-1 h-[80%] w-[100%]">
        {/* ---Desayuno - Almuerzo/Cena - Pedidos --- */}
        <section
          id="desayunoOalmuerzoCena"
          className=" h-[10%] w-[100%] flex flex-row justify-end"
        >
          <div
            className={`h-[100%] w-[220px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Desayuno"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => {
              handleSelectProductType("Desayuno");
              setShowOrders(false);
            }} // Manejador para seleccionar desayuno
          >
                      <h1>Desayuno</h1>
          </div>
          <div
            className={`h-[100%] w-[280px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Almuerzo"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => {handleSelectProductType("Almuerzo");
          setShowOrders(false);
          }}
          >
            <h1>Almuerzo/Cena</h1>
          </div>
          <div
            className={`h-[100%] w-[220px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Pedidos"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => setShowOrders(true)} // Manejador para seleccionar Almuerzo
          >
            <h1>Pedidos</h1>
          </div>
         </section>
        {/* ---Order&Menu--- */}
       
        <section
        id="menuYCompra"
        className=" h-[755px] w-[100%] bg-crema p-[20px] rounded-b-[25px] rounded-tl-[25px] overflow-auto hm:h-[545px]"
      >
        {showOrders && <div className="mt-4">{handleInformation()}</div>}




      </section>
      </main>

      {/* ---Background--- */}
      <Background />
    </article>
  );
};
