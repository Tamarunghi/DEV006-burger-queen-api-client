export const NameAndTable = ()=>{
return(
<div
            id="nameAndTable"
            className="h-[10%] w-[100%] p-[1%] flex flex-row justify-evenly items-center gap-1"
          >
            <label>Nombre:</label>
            <input
              type="text"
              className="bg-crema h-[50%] w-[40%] rounded-5 border-skin border-[3px]"
            ></input>
            <label>Mesa:</label>
            <input
              type="text"
              className="bg-crema h-[50%] w-[40%] rounded-5 border-skin border-[3px]"
            ></input>
          </div>
)
}