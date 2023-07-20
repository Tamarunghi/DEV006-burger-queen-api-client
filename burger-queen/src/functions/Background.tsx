import burger from "../Images/burger.png";

export function Background(){
return(<section className="z-0">
      <img src={burger} alt="burger" className=" h-auto	w-9/12 absolute top-[-34px] right-[-196px] -rotate-135 opacity-50	"/>
      <img src={burger} alt="burger" className="h-auto	w-9/12 absolute bottom-[-71px] left-[-180px] rotate-45 opacity-50	"/>
      </section> 
)
}