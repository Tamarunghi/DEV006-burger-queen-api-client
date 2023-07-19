// type informationTarget={
//   name : string
//   price : number
// } 
interface OrderSelectionItemProps {
    name: string;
    price: number;
    onClick?: () => any;
  }

export const OrderSelectionItem:React.FC<OrderSelectionItemProps> = ({name, price, onClick}) => {
    return (
      
      <div id="buttom1" className="bg-notPress h-[90px] w-[200px] rounded-25 flex flex-row border-2 border-borderNotPress drop-shadow-productUnpress" onClick={onClick}>        
      <div id="product" className="bg-notPress h-[90px] w-[140px] rounded-tl-25 rounded-bl-25">{name}</div>
        <div id="price" className="bg-crema h-[90px] w-[60px] rounded-tr-25 rounded-br-25"> {price}</div>
      </div>
    )
  }