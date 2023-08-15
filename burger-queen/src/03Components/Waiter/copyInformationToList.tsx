// import { IAddedToList } from "../Interfaces";
// import React, { useState } from "react";

// export const InformationToList: React.FC<IAddedToList> = ({
//   client,
//   id,
//   products,
//   status,
//   dateEntry,
// }) => {
//   const buttonStatus =
//     status === "Pendiente" ? "En preparación" : "Listo para entregar";
//   // const [buttonStatus, setButtonStatus] = useState(status); // no se vuelve a usar status

//   const buttonClasses =
//     buttonStatus === "En preparación"
//       ? "bg-yellow text-brownText border-darkBrown"
//       : "bg-minusButtom text-redText border-redText";

//   const handleSendButton = () => {
//     console.log("clickeado");
//   };

//   return (
//     <main className=" h-auto w-[100%] bg-crema p-[15px] rounded-b-[25px] rounded-tl-[25px] overflow-auto hm:h-[545px]">
//       <section className="bg-press h-auto w-[100%] text-[1.1rem] p-[20px] mb-[15px] text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25 flex flex-row shadow-notPressShadow opacity-70">
//         <section className="h-[90%] w-[100%] m-[10px] grid grid-cols-3">
//           {/* ---TIME--- */}
//           <div className="indent-4 min-h-[70px] w-[100%] col-start-1 col-end-4 flex justify-evenly items-center">
//             <div className="h-[66px] w-[50%] p-[1%] flex flex-start justify-center">
//               <p className="w-[190px]">Hora pedido:</p>
//               <p className="bg-skin h-[50%] w-[250px] rounded-5">{dateEntry}</p>
//             </div>
//             {/* ---CLIENT--- */}
//             {/* <div className="indent-4 min-h-[70px] w-[100%] col-start-1 col-end-4 flex justify-center items-center"> */}
//             <div className="h-[66px] w-[40%] p-[1%] flex flex-row justify-center">
//               <p>Nombre:</p>
//               <p className="bg-skin h-[50%] w-[40%] rounded-5">{client}</p>
//             </div>
//             {/* </div> */}
//           </div>

//           {/* ---PRODUCT--- */}
//           <form className="col-start-1 col-end-3 flex flex-col">
//             {products.map((product) => (
//               <ul
//                 className="mb-4 flex items-center"
//                 key={`${product.product.id}${id}`}
//               >
//                 <li className="ml-4 list-disc">
//                   ({product.qty}) {product.product.name}
//                 </li>
//               </ul>
//             ))}
//           </form>
//           {/* ---BUTTON--- */}
//           <div className="col-end-3 col-end-4 flex justify-end items-center">
//             <button
//               value={buttonStatus}
//               className={`h-[50px] w-[80%]  rounded-r-[25px] border-[1.5px] ${buttonClasses} `}
//               onClick={() => {
//                 handleSendButton();
//               }}
//             >
//               {buttonStatus}
//             </button>
//           </div>
//         </section>
//       </section>
//     </main>
//   );
// };
