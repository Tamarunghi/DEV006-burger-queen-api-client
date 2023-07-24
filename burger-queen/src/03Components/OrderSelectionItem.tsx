import { useState } from "react";

interface OrderSelectionItemProps {
    name: string;
    price: number;
    onClick?: () => any;
   }

   export const OrderSelectionItem: React.FC<OrderSelectionItemProps> = ({ name, price, onClick }) => {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(true);
      if (onClick) {
        onClick();
      }
    };
  
    return (
      <div
        id="buttom1"
        className={`h-[90px] w-[200px] p-4 text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25 flex flex-row shadow-notPressShadow opacity-70 bg-gradient-to-r from-notPress via-notPress to-crema ${
          isClicked ? "text-darkGreen border-greenText shadow-pressShadow opacity-100 bg-gradient-to-r from-press via-press to-crema" : "opacity-70"
        }`}
        onClick={handleClick}
      >
        <div id="product" className="h-[90px] w-[140px] rounded-tl-25 rounded-bl-25">
          {name}
        </div>
        <div id="price" className="h-[90px] w-[60px] rounded-tr-25 rounded-br-25">
          ${price}
        </div>
      </div>
    );
  };