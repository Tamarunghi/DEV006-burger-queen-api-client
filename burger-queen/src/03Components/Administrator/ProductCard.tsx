import edit from "../../04Images/edit.png";
import trashCan from "../../04Images/trashCan.png";

interface ProductCardI {
  product: any;
  onEdit: (argument: any) => void;
  onDelete: (argument: any) => void;
}
export const ProductCard: React.FC<ProductCardI> = ({
  product,
  onEdit,
  onDelete,
}) => (
  <article
    key={product.id}
    className="grid grid-cols-4 h-auto flex flex-col text-[1.1rem] p-[20px] mb-[25px] text-darkBrown font-extrabold border-[0.1px] "
  >
    <div className="text-xl col-span-2">
      <div>
        <p>
          PRODUCTO:<span>{product.name}</span>
        </p>
      </div>
      <div>
        <p>
          PRECIO:<span>{product.price}</span>
        </p>
      </div>
    </div>
    <div className="flex justify-center items-center">
      <img
        src={edit}
        className="h-[60px] w-[60px] "
        onClick={() => onEdit(product)}
      />
    </div>
    <div className="  bg-minusButtom rounded-full flex justify-center items-center">
      <img
        src={trashCan}
        className="h-[50px] w-[40px] flex justify-center"
        onClick={() => onDelete(product)}
      />
    </div>
  </article>
);
