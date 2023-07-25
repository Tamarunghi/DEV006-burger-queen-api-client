import exit from "../04Images/exit.png";

export const LoggedUserAndExist = () => {
  const userInfo: string = localStorage.getItem("userEmail")!;

  return (
    <div className="w-[10%]">
      <h1>{userInfo}</h1>
      <img src={exit} className= "w-[50px] h-auto"/>
    </div>
  );
};
