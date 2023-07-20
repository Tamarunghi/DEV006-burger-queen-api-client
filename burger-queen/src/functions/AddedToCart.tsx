import trashCan from "../Images/trashCan.png";
interface Product {
  name: string;
  price: number;
  quantity: number;
  Increment: () => void;
  Decrement: () => void;
}
export const AddedToCart: React.FC<Product> = ({
  name,
  price,
  quantity,
  Increment,
  Decrement,
}) => {
  return (
    <div
      id="productTable"
      className="h-[65px] w-[100%] grid grid-cols-10 gap-1 text-center"
    >
      <div id="product" className="bg-skin col-span-3">
        {name}
      </div>
      <div id="quantity" className="bg-skin col-span-4 grid grid-cols-3">
        <div id="minus" className="bg-minusButtom" onClick={Decrement}>
          -
        </div>
        <div id="number">{quantity}</div>
        <div id="plus" className="bg-plusButtom" onClick={Increment}>
          +
        </div>
      </div>
      <div id="price" className="bg-skin col-span-2 ">
        ${price * quantity}
      </div>
      <img
        id="delete"
        src={trashCan}
        alt="delete"
        className="w-[80%] col-span-1 object-fit"
      />
    </div>
  );
};
interface Total {
  cartItems: Product[];
}
export const TotalAddedToCart: React.FC<Total> = (props) => {
  const { cartItems } = props; // Accede a cartItems desde las propiedades
  console.log("cartItems:", cartItems);
  const totalPrice = cartItems.reduce((total, product) => {
    console.log("product:", product);
    return total + product.price * product.quantity;
  }, 0);
  console.log("totalPrice:", totalPrice);
  return (
    <div
      id="total"
      className="h-[50px] mt-[25px] grid grid-cols-10 gap-1 text-center"
    >
      <div className="bg-skin col-span-3 rounded-tl-[15px] rounded-bl-[15px]">
        Total
      </div>
      <div
        id="totalPrice"
        className="bg-skin col-span-6 rounded-tr-[15px] rounded-br-[15px]"
      >
        ${totalPrice}
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};
