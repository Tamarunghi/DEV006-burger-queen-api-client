import trashCan from "../04Images/trashCan.png";
interface Product {
  name: string;
  price: number;
  Increment: () => void;
  Decrement: () => void;
  Delete: ()=> void,
  clicks: number
}
export const AddedToCart: React.FC<Product> = ({
  name,
  price,
  clicks,
  Increment,
  Decrement,
  Delete,
}) => {
  return (
    <div
      id="productTable"
      className="h-[65px] w-[100%] text-[1.3rem] grid grid-cols-10 gap-1 text-center mt-[10px]"
    >
      <div id="product" className="col-span-3 border-skin border-[3px]">
        {name}
      </div>
      <div id="quantity" className="col-span-4 grid grid-cols-3">
        <div id="minus" className="text-[2rem] font-extrabold border-minusButtom border-[3px]" onClick={Decrement}>
          -
        </div>
        <div id="number" className="text-[1.5rem] border-skin border-t-[3px] border-b-[3px]">{clicks}</div>
        <div id="plus" className="text-[2rem] font-extrabold border-plusButtom border-[3px]" onClick={Increment}>
          +
        </div>
      </div>
      <div id="price" className="col-span-2 border-skin border-[3px]">
        ${price * clicks}
      </div>
      <img
        id="delete"
        src={trashCan}
        alt="delete"
        className="w-[80%] col-span-1 object-fit"
        onClick={Delete}
      />
    </div>
  );
};
interface Total {
  cartItems: Product[];
}
export const TotalAddedToCart: React.FC<Total> = ({cartItems}) => {

  const totalPrice= cartItems.reduce((total, product)=>{
    return total + (product.price * product.clicks);
   }, 0)

  return (
    <div
      id="total"
      className="h-[50px] mt-[25px] grid grid-cols-10 gap-1 text-center"
    >
      <div className="col-span-3 rounded-tl-[15px] rounded-bl-[15px] border-skin border-[3px]">
        Total
      </div>
      <div
        id="totalPrice"
        className="col-span-6 rounded-tr-[15px] rounded-br-[15px] border-skin border-[3px]"
      >
      ${totalPrice}
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};
