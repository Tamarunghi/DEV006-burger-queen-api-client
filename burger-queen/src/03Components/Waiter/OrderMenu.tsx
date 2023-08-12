import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { PostOrders } from "../../02App/postOrders";
import { ICartItems, orderItems, orderData } from "../Interfaces";
import { AddedToCart, TotalAddedToCart } from "./AddedToCart";
import { DeletePopup } from "./DeletePopup";
import { OrderSelectionItem } from "./OrderSelectionItem";
import { GetProducts } from "../../02App/getProduct";
import Swal from "sweetalert2";
interface OrderMenuProps {
  productType: string;
}

export const OrderMenu: React.FC<OrderMenuProps> = ({ productType }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<ICartItems[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [isNameComplete, setIsNameComplete] = useState(false);
  const [isCardSelected, setIsCardSelected] = useState(false);

  useEffect(() => {
    GetProducts()
      .then((data) => {
        const productsWithClick = data.map((product: any) => ({
          ...product,
          clicks: 0,
        }));
        console.log(data);
        setProducts(productsWithClick);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);
  const handleAddToCart = (product: any) => {
    // Verifica si el producto ya esta en el carrito
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya esta en el carrito, incrementar su contador de clics
      setCartItems((prevCartItems) => {
        const updatedCartItems = prevCartItems.map((item) =>
          item.id === product.id ? { ...item, clicks: item.clicks + 1 } : item
        );
        return updatedCartItems;
      });
    } else {
      // Si el producto no esta en el carrito, agregarlo con un contador de clics inicial de 1
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, clicks: 1 },
      ]);
      setIsCardSelected(true);
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
      .then((result: any) => {
        if (result.isConfirmed) {
          setIsCardSelected(cartItems.length > 1);
          setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
              (item) => item.id !== productId
            );
            return updatedCartItems;
          });
        } else if (result.isDenied) {
          // El usuario hizo clic en el boton cancelar o cerro el SweetAlert
          console.log("Eliminación cancelada");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSetValue = (
    callback: (a: string) => void,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    callback(event.target.value);
    setIsNameComplete(event.target.value !== "");
  };

  const handleSendOrders = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Pedido enviado a cocina",
    });

    const orderItems: orderItems[] = cartItems.map((item) => ({
      qty: item.clicks,
      product: {
        id: item.id,
        name: item.name,
        price: item.price,
        type: item.type,
        dateEntry: item.dateEntry,
        // imagen: item.image,
      },
    }));
    const orderData: orderData = {
      userId: localStorage.getItem("userId"),
      client: customerName,
      products: orderItems,
      status: "Pendiente",
      dateEntry: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    console.log(orderData);
    PostOrders(orderData)
      .then((response) => {
        console.log("se guardooo perro", response);
        return response;
      })
      .catch((error) => {
        7;
        console.error("error perro", error);
      });
  };

  return (
    <>
      {/* ---Name + Table--- */}
      <div
        id="nameAndTable"
        className="h-[10%] w-[100%] p-[1%] text-brownText text-[1.2rem] font-bold flex flex-row justify-evenly items-center gap-1 hm:h-[15%]"
      >
        <h1>Nombre:</h1>
        <input
          type="text"
          value={customerName}
          onChange={(e) => handleSetValue(setCustomerName, e)}
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
              // image={product.image}
              quantity={
                cartItems.find((item) => item.id === product.id)?.clicks || 0
              }
              onClick={() => {
                handleAddToCart(product);
              }}
            />
          ))}
      </div>

      {/* ---Shopping Cart--- */}

      <div id="cart" className="h-auto w-[100%] p-[5%] text-[1.5rem] font-bold">
        {/* ---Titles--- */}
        <div
          id="titles"
          className="h-[50px] w-[100%] grid grid-cols-10 gap-1 text-center mb-[15px]"
        >
          <div id="product" className="bg-yellow col-span-3 rounded-tl-[15px]">
            Producto
          </div>
          <div id="quantity" className="bg-yellow col-span-4">
            Cantidad
          </div>
          <div id="price" className="bg-yellow col-span-2 rounded-tr-[15px]">
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
          disabled={!isNameComplete || !isCardSelected}
        >
          Enviar a Cocina
        </button>
      </div>
    </>
  );
};
