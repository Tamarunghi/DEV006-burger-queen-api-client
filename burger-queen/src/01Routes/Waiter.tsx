import { LoggedUserAndExist } from "../03Components/LoggedUserAndExist";
import { LogoPng } from "../03Components/logoComponent";
import { Background } from "../03Components/Background";
import { InformationToList } from "../03Components/Waiter/InformationToList";
import { GetOrders } from "../02App/getOrders";
import { OrderMenu } from "../03Components/Waiter/OrderMenu";
import { useEffect, useState } from "react";

export const Waiter: React.FC = () => {
  const [productType, setProductType] = useState("Desayuno");
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    GetOrders()
      .then((data) => {
        setOrders(data); // Guarda las órdenes en el estado 'orders'
      })
      .catch((error) => {
        console.error("Error fetching orders", error);
      });
  }, []);

  const renderSelectedComponent = () => {
    if (productType === "Desayuno" || productType === "Almuerzo") {
      return <OrderMenu productType={productType} />;
    } else if (productType === "Pedidos") {
      return orders.map((order) => (
        <InformationToList
          key={order.id}
          client={order.client}
          products={order.products}
          dateEntry={order.dateEntry}
          userId={order.userId}
          status={order.status}
          id={order.id}
        />
      ));
    } else {
      return null; // Return null for other cases
    }
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
            MESERO
          </label>
        </div>
      </header>

      {/* ---MAIN SECTION--- */}
      <main id="content" className=" z-1 h-[80%] w-[100%]">
        {/* ---Desayuno - Almuerzo/Cena--- */}
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
            onClick={() => setProductType("Desayuno")} // Manejador para seleccionar desayuno
          >
            <h1>Desayuno</h1>
          </div>
          <div
            className={`h-[100%] w-[280px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Almuerzo"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => setProductType("Almuerzo")} // Manejador para seleccionar Almuerzo
          >
            <h1>Almuerzo/Cena</h1>
          </div>
          <div
            className={`h-[100%] w-[220px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Pedidos"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => setProductType("Pedidos")} // Manejador para seleccionar Pedidos
          >
            <h1>pedidos</h1>
          </div>
        </section>

        {/* ---Order&Menu--- */}
        <section
          id="menuYCompra"
          className=" h-[755px] w-[100%] bg-crema p-[20px] rounded-b-[25px] rounded-tl-[25px] overflow-auto"
        >
          {renderSelectedComponent()}
        </section>
      </main>

      {/* ---Background--- */}
      <Background />
    </article>
  );
};
