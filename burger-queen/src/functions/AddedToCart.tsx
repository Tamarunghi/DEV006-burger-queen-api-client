// import trash from "../Images/trash.png";
interface Product {
  name: string;
  price: number;
}
export const AddedToCart:React.FC<Product> =({ name, price})=>{
    return(
<div id="productTable" className="h-[65px] w-[100%] grid grid-cols-10 gap-1 text-center">
              <div id="product" className="bg-skin col-span-3">{name}</div>
              <div id="quantity" className="bg-skin col-span-4 grid grid-cols-3">
                <div id="minus" className="bg-minusButtom">-</div>
                <div id="number"></div>
                <div id="plus" className="bg-plusButtom">+</div>
              </div>
              <div id="price" className="bg-skin col-span-2 ">${price}</div>
              {/* <img id="delete" src={trash} alt="delete" className="w-[80%] col-span-1 object-fit" /> */}
            </div>
)
}