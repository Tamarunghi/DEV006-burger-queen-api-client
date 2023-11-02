import Swal from "sweetalert2";

import { GetProducts } from "../../02App/getProduct";
import addProduct from "../../04Images/addProduct.png";
import { IProduct, Product } from "../Interfaces";
import { useEffect, useState } from "react";
import { PostProducts } from "../../02App/postProducts";
import dayjs from "dayjs";
import { deleteProduct } from "../../02App/deleteProduct";
import { patchProducts } from "../../02App/patchProducts";
import { ProductCard } from "../Administrator/ProductCard";

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = () => {
    GetProducts()
      .then((data) => {
        console.log("data", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("error", error);
      });
    console.log("se actuailzi");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    console.log("agregar");
    try {
      const content = document.createElement("div");

      content.innerHTML = `
              <div class="flex items-center justify-center mb-2">
                <span class="font-bold text-xl mr-2">TIPO:</span>
                <select id="tipo" class="swal2-input">
                  <option value="Desayuno">Desayuno</option>
                  <option value="Almuerzo">Almuerzo</option>
                  </select>
              </div>
              
              <div class="flex items-center justify-center">
                <span class="font-bold text-xl mr-2">PRODUCTO:</span>
                <input id="producto" class="text-xl"  maxlength="12" placeholder="Ingrese el nombre de producto">
              </div>
              <div class="flex items-center justify-center">
                <span class="font-bold text-xl mr-2">PRECIO:</span>
                <input id="precio" class="text-xl" placeholder="Ingresa el precio">
              </div>
            `;

      Swal.fire({
        html: content,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonColor: "#C1D78F",
        confirmButtonColor: "#FF8A8A",
        confirmButtonText: "Agregar",
        focusConfirm: false,
        preConfirm: () => {
          const tipoInput = document.getElementById(
            "tipo"
          ) as HTMLSelectElement;
          const productoInput = document.getElementById(
            "producto"
          ) as HTMLInputElement;
          const precioInput = document.getElementById(
            "precio"
          ) as HTMLInputElement;
          const tipoI = tipoInput.value;
          const productoI = productoInput.value;
          const precioI = precioInput.value;

          const dataProduct = {
            name: productoI,
            price: precioI,
            type: tipoI,
            dateEntry: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          };

          if (tipoI && productoI && precioI) {
            // Realiza la solicitud POST aquí utilizando
            PostProducts(dataProduct)
              .then((resolve) => {
                if (resolve && resolve.status === 201) {
                  Swal.fire({
                    icon: "success",
                    title: "Producto agregado con éxito.",
                    confirmButtonColor: "#C1D78F",
                  });
                  fetchProducts();
                } else {
                  console.error("error en el else");
                  Swal.fire({
                    icon: "error",
                    title: "Error al agregar el producto.",
                    confirmButtonColor: "#C1D78F",
                  });
                }
              })
              .catch((error) => {
                console.error("error", error);
                Swal.fire({
                  icon: "error",
                  title: "Error al agregar el producto",
                  confirmButtonColor: "#C1D78F",
                });
              });
          } else {
            Swal.fire({
              icon: "error",
              title: "Campos incompletos",
              confirmButtonColor: "#C1D78F",
            });
          }
        },
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleEdit = (product: Product): void => {
    try {
      const content = document.createElement("div");

      content.innerHTML = `
          <div class="flex items-center justify-center mb-2">
            <span class="font-bold text-xl mr-2">TIPO:</span>
            <select id="tipo" class="swal2-input">
            <option value="Desayuno">Desayuno</option>
            <option value="Almuerzo">Almuerzo</option>
            </select>
          </div>
          
          <div class="flex items-center justify-center">
          <span class="font-bold text-xl mr-2">PRODUCTO:</span>
          <input id="producto" class="text-xl" placeholder="Ingrese el nombre de producto" value="${product.name}">
        </div>
        <div class="flex items-center justify-center">
          <span class="font-bold text-xl mr-2">PRECIO:</span>
          <input id="precio" class="text-xl" placeholder="Ingresa el precio">
        </div>
         `;

      Swal.fire({
        html: content,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonColor: "#C1D78F",
        confirmButtonColor: "#FF8A8A",
        confirmButtonText: "Editar",
        focusConfirm: false,
        preConfirm: () => {
          const tipoInput = document.getElementById(
            "tipo"
          ) as HTMLSelectElement;
          const productoInput = document.getElementById(
            "producto"
          ) as HTMLInputElement;
          const precioInput = document.getElementById(
            "precio"
          ) as HTMLInputElement;
          const tipoI = tipoInput.value;
          const productoI = productoInput.value;
          const precioI = precioInput.value;

          if (tipoI && productoI && precioI) {
            // Realiza la solicitud PATCH aquí utilizando la función patchUsers
            patchProducts(product.id, productoI, precioI, tipoI)
              .then((response) => {
                if (response && response.status === 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Producto editado con éxito.",
                    confirmButtonColor: "#C1D78F",
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Error al editar el producto.",
                    confirmButtonColor: "#C1D78F",
                  });
                }

                fetchProducts();

                return response;
              })
              .catch((error) => {
                console.error("Error al hacer la solicitud PATCH", error);
                Swal.fire({
                  icon: "error",
                  title: "Error al editar el producto.",
                  confirmButtonColor: "#C1D78F",
                });
              });
          } else {
            Swal.fire({
              icon: "error",
              title: "Campos incompletos",
              confirmButtonColor: "#C1D78F",
            });
          }
        },
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const handleDelete = (product: Product): void => {
    Swal.fire({
      title: "Desea eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8A8A",
      cancelButtonColor: "#C1D78F",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
        deleteProduct(product.id)
          .then((resolve) => {
            fetchProducts();
            console.log("eliminado");
            return resolve;
          })
          .catch((error) => {
            console.error("error", error);
          });
      }
    });
  };
  const productsDesayuno = products.filter(
    (product) => product.type === "Desayuno"
  );
  const productsAlmuerzo = products.filter(
    (product) => product.type === "Almuerzo"
  );

  return (
    <>
      <div className="flex justify-end">
        <img
          src={addProduct}
          className="h-[120px] w-[100px]"
          onClick={handleAdd}
        />
      </div>

      <div
        className={`h-[100px] w-[220px] bg-yellow text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center`}
      >
        <h1>Desayuno</h1>
      </div>
      <div className="bg-bggray h-auto flex flex-col text-[1.1rem] p-[20px] mb-[25px] text-darkBrown font-extrabold border-[0.1px] border-borderPress opacity-70">
        {productsDesayuno.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div
        className={`h-[100px] w-[220px] bg-yellow text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center`}
      >
        <h1>Almuerzo</h1>
      </div>
      <div className="bg-bggray h-auto flex flex-col text-[1.1rem] p-[20px] mb-[25px] text-darkBrown font-extrabold border-[0.1px]border-borderPress opacity-70">
        {productsAlmuerzo.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};
