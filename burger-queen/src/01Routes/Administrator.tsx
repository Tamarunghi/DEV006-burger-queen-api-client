import React, { useEffect, useState } from "react";
import { LoggedUserAndExist } from "../03Components/LoggedUserAndExist";
import { LogoPng } from "../03Components/logoComponent";
import { Background } from "../03Components/Background";
import { Workers } from "../03Components/Administrator/Workers";
import { Products } from "../03Components/Administrator/Products";
export const Administrator: React.FC = () => {
  const [selectType, setSelectType] = useState("Trabajadores");

  const handleSelectType = (type: string) => {
    setSelectType(type);
  };
  useEffect(() => {}, []);

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
            ADMR
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
              selectType === "Trabajadores"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectType("Trabajadores")} // Manejador para seleccionar desayuno
          >
            <h1>Empleados</h1>
          </div>
          <div
            className={`h-[100%] w-[280px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              selectType === "Productos"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectType("Productos")} // Manejador para seleccionar Almuerzo
          >
            <h1>Productos</h1>
          </div>
        </section>

        {/* ---Order&Menu--- */}
        <section
          id="menuYCompra"
          className=" h-[755px] w-[100%] bg-crema p-[20px] rounded-b-[25px] rounded-tl-[25px] overflow-auto"
        >
          {/* ---Send Buttom--- */}
          {selectType === "Trabajadores" ? <Workers /> : <Products />}
        </section>
      </main>

      {/* ---Background--- */}
      <Background />
    </article>
  );
};
