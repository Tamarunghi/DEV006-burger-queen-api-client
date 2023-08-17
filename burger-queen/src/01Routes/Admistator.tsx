import { LogoPng } from "../03Components/logoComponent";
import { Background } from "../03Components/Background";
import { useEffect, useState } from "react";
import { LoggedUserAndExist } from "../03Components/LoggedUserAndExist";
import { Workers } from "../03Components/Administrator/Workers";
import { Products } from "../03Components/Administrator/Products";

export const Administrator: React.FC = () => {
  const [productType, setProductType] = useState("Trabajadores");
  const [users, setUsers] = useState([]);
  const renderSelectedComponent = () => {
    if (productType === "Trabajadores") {
      return <Workers  />;
    }else {
      return <Products/>;
    }
  };

  return (
    <article className="h-[97vh] hm:vw-[97vw] flex flex-col m-[20px]">
      {/* ---HEADER(LOGO + MESERO)--- */}
      <header className=" z-1 w-[100%] h-[20%] mb-[20px] flex items-center justify-between">
        <LogoPng />
        <div className="w-[100%] h-[100%] hm:[10%] flex flex-col items-end">
          <LoggedUserAndExist />
          <label
            id="waiterPg"
            className="font-bold text-[60px] text-crema border-brownText drop-shadow-[4px_4px_0.5px_#65362A] hm:text-[75px] hm:mt-[-17px]"
          >
            ADMINISTRADOR
          </label>
        </div>
      </header>

      {/* ---MAIN SECTION--- */}
      <main id="content" className=" z-1 h-[80%] w-[100%]">
        {/* ---Workers & Products--- */}
        <section
          id="workersAndProducts"
          className=" h-[10%] w-[100%] flex flex-row justify-end"
        >
          <div
            className={`h-[100%] w-[260px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Trabajadores"
                ? "textTransform: uppercase"
                : "bg-yellow"
            }`}
            onClick={() => setProductType("Trabajadores")}
          >
            <h1>Trabajadores</h1>
          </div>
          <div
            className={`h-[100%] w-[260px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Productos"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => setProductType("Productos")} // Manejador para seleccionar Productos
          >
            <h1>Productos</h1>
          </div>
        </section>

        <section
          id="menuYCompra"
          className=" h-[755px] w-[100%] bg-crema p-[20px] rounded-b-[25px] rounded-tl-[25px] overflow-auto hm:h-[545px]"
        >
          {renderSelectedComponent()}
        </section>
      </main>

      {/* ---Background--- */}
      <Background />
    </article>
  );
};
