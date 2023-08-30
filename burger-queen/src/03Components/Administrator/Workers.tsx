import add from "../../04Images/add.png";
import edit from "../../04Images/edit.png";
import trashCan from "../../04Images/trashCan.png";
import { EditPopup } from "./editPopup";
export const Workers = () => {
  const handleEdit = (): void => {
    EditPopup()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  return (
    <>
      <div className="flex justify-center">
        <img src={add} className="h-[90px] w-[90px] " />
      </div>

      <article className="bg-press grid grid-cols-4 h-auto flex flex-col text-[1.1rem] p-[20px] mb-[25px] text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25  shadow-notPressShadow opacity-70">
        <div className="text-xl col-span-2">
          <div>
            <p>
              ROL:<span>administrador</span>
            </p>
          </div>
          <div>
            <p>
              EMAIL:<span>andrea@hotmail.com</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <img src={edit} className="h-[60px] w-[60px] " onClick={handleEdit} />
        </div>
        <div className="  bg-minusButtom rounded-full flex justify-center">
          <img
            src={trashCan}
            className="h-[50px] w-[40px] flex justify-center"
          />
        </div>
      </article>
    </>
  );
};
