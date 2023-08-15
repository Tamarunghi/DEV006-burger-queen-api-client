import { IAddedToList } from "../Interfaces";
import React, { useState } from "react";

export const InformationToList: React.FC<IAddedToList> = ({
  client,
  id,
  products,
  status,
  dateEntry,
}) => {
  const [buttonStatus, setButtonStatus] = useState(
    status === "Pendiente" ? "En preparación" : "Listo para entregar"
  );
  const isDisabledButton =
    buttonStatus === "En preparación" || buttonStatus === "Entregado";
  const buttonClasses =
    buttonStatus === "En preparación"
      ? "bg-yellow text-brownText border-darkBrown"
      : buttonStatus === "Listo para entregar"
      ? "bg-minusButtom text-redText border-redText"
      : "bg-plusButtom text-greenText border-greenText";

  const handleSendButton = () => {
    if (buttonStatus === "Listo para entregar") {
      setButtonStatus("Entregado");
    }
  };

  return (
    <main className="bg-press h-auto w-[100%] flex flex-col text-[1.1rem] p-[20px] mb-[25px] text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25  shadow-notPressShadow opacity-70">
      {/* ---TIME & NAME--- */}
      <section
        id="timeAndName"
        className=" flex flex-row justify-between mb-[10px] ml-[10px]"
      >
        <div className="ml-[20px]">
          <p>
            NOMBRE:
            <span className="ml-[12px]">{client}</span>
          </p>
        </div>
        <div className="mr-[20px]">
          <p>
            TIEMPO:
            <span className="ml-[12px] ">{dateEntry}</span>
          </p>
        </div>
      </section>
      {/* ---ORDER & BUTTON--- */}
      <section
        id="orderAndButton"
        className="flex flex-row mt-[10px] mr-[10px]"
      >
        <form className="flex flex-col w-[60%] ml-[20px]">
          {products.map((product) => (
            <ul
              className="mb-4 flex items-center"
              key={`${product.product.id}${id}`}
            >
              <li className="ml-4 list-disc">
                ({product.qty}) {product.product.name}
              </li>
            </ul>
          ))}
        </form>
        <div className="flex justify-center items-center w-[40%]">
          <button
            value={buttonStatus}
            className={`h-[50px] w-[80%]  rounded-r-[25px] border-[1.5px] ${buttonClasses} `}
            onClick={handleSendButton}
            disabled={isDisabledButton}
          >
            {buttonStatus}
          </button>
        </div>
      </section>
    </main>
  );
};
