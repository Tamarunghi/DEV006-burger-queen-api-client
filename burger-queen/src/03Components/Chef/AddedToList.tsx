import { IAddedToList } from "../Interfaces";
import React, { useState } from "react";
import { TimeCounter } from "./TimeCounter";
import { completeOrder } from "../../02App/patchOrders";

export const AddedToList: React.FC<IAddedToList> = ({
  client,
  id,
  products,
  status,
  dateEntry,
}) => {
  const [buttonStatus, setButtonStatus] = useState(status); // no se vuelve a usar status
  const [isCounting, setIsCounting] = useState(true);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);

  const handleCheckboxChangeNew: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    console.log(e.target);
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setSelectedCheckboxes((prevState) => [...prevState, Number(value)]);
    } else {
      setSelectedCheckboxes((prevState) =>
        prevState.filter((productId) => productId !== Number(value))
      );
    }
  };
  const handleSendButton = () => {
    if (buttonStatus === "Pendiente") {
      completeOrder(id)
        .then((response) => {
          setButtonStatus("Completado");
          console.log("logrado");
          return response;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <main className="bg-press h-auto w-[100%] text-[1.1rem] p-[20px] mb-[15px] text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25 flex flex-row shadow-notPressShadow opacity-70">
      <section className="h-[90%] w-[100%] m-[10px] grid grid-cols-3">
        {/* ---TIME--- */}
        <div className="indent-4 min-h-[70px] w-[100%] col-start-1 col-end-4 flex justify-center items-center">
          <div className="h-[66px] w-[100%] p-[1%] flex flex-row justify-evenly items-center gap-1">
            <p>Hora pedido:</p>
            <div className="bg-skin h-[50%] w-[40%] rounded-5">{dateEntry}</div>
            <p>Tiempo:</p>
            <div className="bg-skin wh-[50%] w-[20%] rounded-5">
              <TimeCounter dateEntry={dateEntry} isCounting={isCounting} />
            </div>
          </div>
        </div>
        {/* ---CLIENT--- */}
        <div className="indent-4 min-h-[70px] w-[100%] col-start-1 col-end-4 flex justify-center items-center">
          <div className="h-[66px] w-[100%] p-[1%] flex flex-row gap-1">
            <p>Nombre:</p>
            <p className="bg-skin h-[50%] w-[40%] rounded-5">{client}</p>
          </div>
        </div>
        {/* ---PRODUCT--- */}
        <form className="col-start-1 col-end-3 flex flex-col">
          {products.map((product) => (
            <label
              className="mb-4 flex items-center"
              key={`${product.product.id}${id}`}
              htmlFor={`checkbox-${product.product.id}${id}`}
            >
              <input
                type="checkbox"
                id={`checkbox-${product.product.id}${id}`}
                value={product.product.id}
                className="w-8 h-8"
                disabled={[status, buttonStatus].some(
                  (value) => value === "Completado"
                )}
                checked={
                  [status, buttonStatus].some((value) => value === "Completado")
                    ? true
                    : selectedCheckboxes.includes(product.product.id)
                }
                onChange={handleCheckboxChangeNew}
              />
              <span className="ml-4">
                ({product.qty}) {product.product.name}
              </span>
            </label>
          ))}
        </form>
        {/* ---BUTTON--- */}
        <div className="col-end-3 col-end-4 flex justify-end items-center">
          <button
            value={buttonStatus}
            className={`h-[50px] w-[80%]  rounded-r-[25px] border-[1.5px]  ${
              buttonStatus === "Pendiente"
                ? "bg-minusButtom text-redText border-redText"
                : "bg-plusButtom text-greenText border-greenText"
            }`}
            onClick={() => {
              const notComplete = products.length !== selectedCheckboxes.length;

              if (buttonStatus === "Pendiente" && notComplete) {
                alert(
                  "Debe seleccionar todos los productos antes de completar el pedido."
                );
              } else {
                handleSendButton();
              }
            }}
          >
            {buttonStatus}
          </button>
        </div>
      </section>
    </main>
  );
};
