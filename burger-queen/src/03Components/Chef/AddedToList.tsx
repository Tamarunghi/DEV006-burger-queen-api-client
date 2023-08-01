interface IProduct {
  quantity: number;
  productName: string;
}
interface IAddedToList {
  client: string;
  products: IProduct[];
}

export const AddedToList: React.FC<IAddedToList> = ({ client, products }) => {
  return (
    <main className="h-auto w-[100%] text-[1.1rem] p-[20px] text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25 flex flex-row shadow-notPressShadow opacity-70">
      <section className="h-[90%] w-[100%] m-[10px] grid grid-cols-3 gap-1">
        <div className="min-h-[70px] w-[100%] col-start-1 col-end-4 flex justify-center items-center">
          <div className="h-[66px] w-[100%] p-[1%] flex flex-row justify-evenly items-center gap-1">
            <p>Nombre:</p>
            <p className="bg-skin h-[50%] w-[40%] rounded-5">{client}</p>
            <p>Mesa:</p>
            <p className="bg-skin h-[50%] w-[40%] rounded-5">mesa</p>
          </div>
        </div>
        <form className="h-auto w-[100%] col-start-1 col-end-3 flex flex-col justify-center items-start">
          <label htmlFor="default-checkbox">
            {products.map((product: IProduct) => (
              <div key={product.productName}>
                
                <input
                  id={`checkbox-${product.productName}`}
                  type="checkbox"
                  value={product.productName}
                  className="w-[1.2rem] h-auto "
                />
                <label htmlFor={`checkbox-${product.productName}`}>
                  ({product.quantity}) {product.productName}
                </label>
              </div>
            ))}
          </label>
        </form>
        <div className="h-[100px] w-[100%] col-end-3 col-end-4 flex justify-end items-center">
          <button className="bg-plusButtom h-[50px] w-[80%] text-greenText rounded-r-[25px] border-[1.5px] border-greenText">
            Pendiente
          </button>
        </div>
      </section>
    </main>
  );
};
