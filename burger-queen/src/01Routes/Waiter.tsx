import React, { useEffect, useState } from "react";
import { GetProducts } from "../02App/getProduct";
import { PostOrders } from "../02App/postOrders";
import { OrderSelectionItem } from "../03Components/Waiter/OrderSelectionItem";
import { AddedToCart, TotalAddedToCart } from "../03Components/Waiter/AddedToCart";
import { LoggedUserAndExist } from "../03Components/LoggedUserAndExist";
import { LogoPng } from "../03Components/logoComponent";
import { Background } from "../03Components/Background";
import { DeletePopup } from "../03Components/Waiter/DeletePopup";

export interface ICartItems {
  id: number;
  clicks: number;
  name: string;
  price: number;
}

export const Waiter: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productType, setProductType] = useState("Desayuno");
  const [cartItems, setCartItems] = useState<ICartItems[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerTable, setcustomerTable] = useState("");
  useEffect(() => {
    GetProducts()
      .then((data) => {
        const productsWithClick = data.map((product: any) => ({
          ...product,
          clicks: 0,
        }));
        setProducts(productsWithClick);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);

  const handleSelectProductType = (type: string) => {
    setProductType(type);
  };
  const handleAddToCart = (product: any) => {
    // Verifica si el producto ya está en el carrito
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, incrementar su contador de clics
      setCartItems((prevCartItems) => {
        const updatedCartItems = prevCartItems.map((item) =>
          item.id === product.id ? { ...item, clicks: item.clicks + 1 } : item
        );
        return updatedCartItems;
      });
    } else {
      // Si el producto no está en el carrito, agregarlo con un contador de clics inicial de 1
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, clicks: 1 },
      ]);
    }
  };
  const handleIncremetQuantity = (productId: number) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === productId ? { ...item, clicks: item.clicks + 1 } : item
      );
      return updatedCartItems;
    });
  };
  const handleDecremetQuantity = (productId: number) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === productId
          ? { ...item, clicks: Math.max(1, item.clicks - 1) }
          : item
      );

      return updatedCartItems;
    });
  };
  const handleDeleteCartItem = (productId: number) => {
    DeletePopup()
      .then((result) => {
        if (result.isConfirmed) {
          setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
              (item) => item.id !== productId
            );
            return updatedCartItems;
          });
        } else if (result.isDenied) {
          // El usuario hizo clic en el botón cancelar o cerró el SweetAlert
          console.log("Eliminación cancelada");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSetValue = (
    callback: (a: string) => void,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    callback(event.target.value);
  };

  const handleSendOrders = () => {
    const name = { customerName };
    console.log(name);
    const table = { customerTable };
    console.log(table);
    interface orderItems {
      product: {
      qty: number;
        id: number;
        name: string;
        price: number;
      };
    }
    interface orderData {
      id: number;
      UserId: number;
      client: string;
      products: orderItems[];
      status: string;
      dantaEntry: Date;
    }
    const orderItems = cartItems.map((item) => ({
      product: {
        qty: item.clicks,
        id: item.id,
        name: item.name,
        price: item.price,
      },
    }));
    const orderData = {
      // id: table,
      client: name,
      products: orderItems,
    };
    console.log(orderData);
    // el signo ! significa que no es null ni undefined(typeScript)
    PostOrders(orderData)
      .then((response) => {
        console.log("se guardooo perro", response);
        return response;
      })
      .catch((error) => {
        console.error("error perro", error);
      });
  };

  return (
    <article className="h-[97vh] flex flex-col m-[20px]">
      {/* ---HEADER(LOGO + MESERO)--- */}
      <header className=" z-1 w-[100%] h-[20%] mb-[20px] flex items-center justify-between">
        <LogoPng />
        <div className="w-[100%] h-[100%] flex flex-col items-end">
          <LoggedUserAndExist />
          <label
            id="waiterPg"
            className="font-bold text-[90px] text-crema border-brownText drop-shadow-[4px_4px_0.5px_#65362A]"
          >
            MESERO
          </label>
        </div>
      </header>

      {/* ---MAIN SECTION--- */}
      <main id="content" className=" z-1 h-[80%] w-[100%]">
        {/* ---Desayuno - Almuerzo/Cena--- */}
        <section
          id="desayunoOalmuerzoCena"
          className=" h-[10%] w-[100%] flex flex-row justify-end"
        >
          <div
            className={`h-[100%] w-[250px] bg-crema rounded-tl-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Desayuno"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectProductType("Desayuno")} // Manejador para seleccionar desayuno
          >
            <label>Desayuno</label>
          </div>
          <div
            className={`h-[100%] w-[250px] bg-crema rounded-tr-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Almuerzo"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectProductType("Almuerzo")} // Manejador para seleccionar Almuerzo
          >
            <label>Almuerzo/Cena</label>
          </div>
        </section>

        {/* ---Order&Menu--- */}
        <section
          id="menuYCompra"
          className=" h-[755px] w-[100%] bg-crema p-[20px] overflow-auto"
        >
          {/* ---Name + Table--- */}
          <div
            id="nameAndTable"
            className="h-[10%] w-[100%] p-[1%] flex flex-row justify-evenly items-center gap-1"
          >
            <label id="name">Nombre:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => handleSetValue(setCustomerName, e)}
              className="bg-skin h-[50%] w-[40%] rounded-5"
            ></input>
            <label id="table">Mesa:</label>
            <input
              type="text"
              value={customerTable}
              onChange={(e) => handleSetValue(setcustomerTable, e)}
              className="bg-skin h-[50%] w-[40%] rounded-5"
            ></input>
          </div>

          {/* ---Order Selection--- */}
          <div
            id="orderSelection"
            className="h-auto w-[100%] p-[1%] flex flex-wrap justify-center justify-evenly text-center gap-y-4"
          >
            {/* ---Menu/Cart--- */}
            {products
              .filter((product) => product.type === productType)
              .map((product) => (
                <OrderSelectionItem
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  quantity={
                    cartItems.find((item) => item.id === product.id)?.clicks ||
                    0
                  }
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                />
              ))}
          </div>

          {/* ---Shopping Cart--- */}

          <div
            id="cart"
            className="h-auto w-[100%] p-[5%] text-[1.5rem] font-bold"
          >
            {/* ---Titles--- */}
            <div
              id="titles"
              className="h-[50px] w-[100%] grid grid-cols-10 gap-1 text-center mb-[15px]"
            >
              <div
                id="product"
                className="bg-yellow col-span-3 rounded-tl-[15px]"
              >
                Producto
              </div>
              <div id="quantity" className="bg-yellow col-span-4">
                Cantidad
              </div>
              <div
                id="price"
                className="bg-yellow col-span-2 rounded-tr-[15px]"
              >
                Precio
              </div>
              <div id="delete" className="col-span-1"></div>
            </div>

            {/* ---Products added--- */}
            {cartItems.map((product) => (
              <AddedToCart
                key={product.id}
                name={product.name}
                clicks={product.clicks}
                price={product.price}
                Increment={() => handleIncremetQuantity(product.id)}
                Decrement={() => handleDecremetQuantity(product.id)}
                Delete={() => handleDeleteCartItem(product.id)}
              />
            ))}
            {/* ---Total--- */}
            <TotalAddedToCart cartItems={cartItems} />
          </div>

          {/* ---Send Buttom--- */}
          <div
            id="SendButtom"
            className="h-[10%] w-[100%] flex justify-center items-center"
          >
            <button
              type="submit"
              className="bg-colorButton hover:bg-buttonHover h-[65px] w-[500px] items-center rounded-[45px]  font-bold text-brownText text-[1.5rem]"
              onClick={handleSendOrders}
            >
              Enviar a Cocina
            </button>
          </div>
        </section>
      </main>

      {/* ---Background--- */}
      <Background />
    </article>
  );
};
