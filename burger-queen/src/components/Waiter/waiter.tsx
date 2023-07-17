import burgerQueen from "../../Images/logoWithBG.gif";
import burger from "../../Images/burger.png";

export const Waiter = () => {
  return (
    <article className="h-[97vh] flex flex-col m-[20px]">
      <header className=" z-1 w-[100%] h-[25%] bg-colorButton mb-[20px]">
        <img id="logo" src={burgerQueen} alt="burgerQueenLogo" className="w-auto h-[25%] absolute top-0 left-0 z-1" />
        <label id="waiterPg" className="text-[100px] text-crema border-[brownText] font-bold">MESERO</label>
      </header>
      <main id="content" className=" z-1 h-[100%] w-[100%]">
        <section id="desayunoOalmuerzoCena" className=" h-[10%] w-[100%] flex flex-row justify-end">
          <div className=" h-[100%] w-[250px] bg-crema rounded-tl-[25px] text-3xl font-bold flex items-center justify-center">
            <label>DESAYUNO</label>
          </div>
          <div className=" h-[100%] w-[250px] bg-crema rounded-tr-[25px] text-3xl font-bold flex items-center justify-center">
            <label>Almuerzo y Cena</label>
          </div>
        </section>
        <section id="menuYcompraa" className=" h-[90%] w-[100%] bg-crema p-[4%]">
           <div id="nameAndTable" className="bg-green-200 h-[10%] w-[100%] p-[1%] flex flex-row justify-evenly items-center gap-1">
            <lable>Nombre:</lable>
            <input type="text" className="bg-skin h-[50%] w-[40%] rounded-5" ></input>
            <lable>Mesa:</lable>
            <input type="text" className="bg-skin h-[50%] w-[40%] rounded-5" ></input>
            </div>     
           <div id="menu" className="bg-green-600 h-auto w-[100%] flex flex-wrap justify-center justify-evenly text-center gap-y-4">
           <div id="buttom1" className="bg-notPress h-[90px] w-[200px] rounded-25 flex flex-row border-2 border-borderNotPress drop-shadow-productUnpress">
          <div id="product" className="bg-notPress h-[90px] w-[140px] rounded-tl-25 rounded-bl-25">Café Americano</div>
          <div id="price" className="bg-crema h-[90px] w-[60px] rounded-tr-25 rounded-br-25">5%</div>
          </div>
          <div id="buttom2" className="bg-notPress h-[90px] w-[200px] rounded-25 flex flex-row border-2 border-borderNotPress drop-shadow-productUnpress">
          <div id="product" className="bg-notPress h-[90px] w-[140px] rounded-tl-25 rounded-bl-25">Café Americano</div>
          <div id="price" className="bg-crema h-[90px] w-[60px] rounded-tr-25 rounded-br-25">5%</div>
          </div>
           <div className="bg-notPress h-[90px] w-[200px]">Café con leche</div>
           <div className="bg-orange-200 h-[90px] w-[200px]">Jugo de frutas natural</div>
           <div className="bg-orange-200 h-[90px] w-[200px]">Sandwich de jamón y queso</div>           
           </div>
           <div id="cart" className="bg-red-600 h-auto w-[100%]">S3</div>
           <div id="SendButtom" className="bg-blue-600 h-[10%] w-[100%]">S4</div>     
        </section>
      </main>
      <section id="background" className="z-0">
        <img src={burger} alt="burger" className=" h-auto	w-9/12 absolute top-[-34px] right-[-196px] -rotate-135 opacity-50	" />
        <img src={burger} alt="burger" className="h-auto	w-9/12 absolute bottom-[-71px] left-[-180px] rotate-45 opacity-50	" />
      </section>
    </article>
  )
}
