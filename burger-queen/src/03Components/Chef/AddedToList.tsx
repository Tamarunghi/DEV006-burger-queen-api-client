interface IProduct {
  qty: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    type: string;
    dateEntry: string;
  };
}

interface IAddedToList {
  client: string;
  products: IProduct[];
}

export const AddedToList: React.FC<IAddedToList> = ({ client, products }) => {
  return (
    <main className="h-[700px] w-[700px] text-[1.1rem] p-4 text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25 flex flex-row shadow-notPressShadow opacity-70">
      <section className="h-[90%] w-[100%] m-[10px] grid grid-cols-3 gap-1">
        <div className="min-h-[70px] w-[100%] col-start-1 col-end-4 flex justify-center items-center">
          <div className="h-[66px] w-[100%] p-[1%] flex flex-row justify-evenly items-center gap-1">
            <p>Nombre:</p>
            <p className="bg-skin h-[50%] w-[40%] rounded-5">{client}</p>
            <p>Mesa:</p>
            <p className="bg-skin wh-[50%] w-[40%] rounded-5">mesa</p>
          </div>
        </div>
        <form className="bg-yellow col-start-1 col-end-3">
          {products.map((product) => (
            <label key={product.product.id} htmlFor={`checkbox-${product.product.id}`}>
              <input type="checkbox" id={`checkbox-${product.product.id}`} className="w-[1.2rem] h-auto" />
              {`${product.qty}  ${product.product.name}`}
            </label>
          ))}
        </form>
        <div className="bg-blue-500 col-end-3 col-end-4 flex justify-end items-center">
          <button className="bg-plusButtom h-[50px] w-[80%] text-greenText rounded-r-[25px] border-[1.5px] border-greenText">
            Pendiente
          </button>
        </div>
      </section>
    </main>
  );
};
