import React, { useState, useEffect } from "react";
import { GetOrders } from "../02App/getOrders";
import { LogoPng } from "../03Components/logoComponent";
import { Background } from "../03Components/Background";
import { LoggedUserAndExist } from "../03Components/LoggedUserAndExist";
import { AddedToList } from "../03Components/Chef/AddedToList";

export const Chef: React.FC = () => {
    const [statusType, setStatusType] = useState("pendiente");
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        // En el efecto, obten las órdenes utilizando la función GetOrders
        GetOrders()
          .then((data) => {
            setOrders(data); // Guarda las órdenes en el estado 'orders'
          })
          .catch((error) => {
            console.error("Error fetching orders", error);
          });
      }, []);

    const handleSelectStatusType = (type: string) => {
        setStatusType(type);
      };



  return (
    <article className="h-[97vh] flex flex-col m-[20px]">
      {/* ---HEADER(LOGO + MESERO)--- */}
      <header className=" z-1 w-[100%] h-[20%] mb-[20px] flex items-center justify-between">
        <LogoPng />
        <div className="w-[100%] h-[100%] flex flex-col items-end">
          <LoggedUserAndExist />
          <label
            id="waiterPg"
            className="font-bold text-[90px] text-crema border-brownText drop-shadow-[4px_4px_0.5px_#65362A]"
          >
            COCINERO
          </label>
        </div>
      </header>
      <main id="content" className=" z-1 h-[80%] w-[100%]">
        {/* ---entregado- pendiente--- */}
        <section
          id="list"
          className=" h-[10%] w-[100%] flex flex-row justify-end"
        >
          <div
            className={`h-[100%] w-[250px] bg-crema rounded-tl-[25px] text-3xl font-bold flex items-center justify-center ${
              statusType === "pendiente"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectStatusType("pendiente")} // Manejador para seleccionar desayuno
          >
            <label>Pendiente</label>
          </div>
          <div
            className={`h-[100%] w-[250px] bg-crema rounded-tr-[25px] text-3xl font-bold flex items-center justify-center ${
              statusType === "entregado"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectStatusType("entregado")} // Manejador para seleccionar desayuno
             >
            <label>Entregado</label>
          </div>
        </section>

        <section
          id="listado"
          className=" h-[755px] w-[100%] bg-crema p-[20px] overflow-auto"
        >
        {orders.map((order)=>(
        <AddedToList
        key={order.id}
        client={order.client}
        products={order.products.map((product:any)=> ({
            productName: product.name,
            quantity: product.qty,
        }))}
        />
        ))}
        </section>
      </main>

      {/* ---Background--- */}
      <Background />
    </article>
  );
};