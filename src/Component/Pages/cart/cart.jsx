import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../Navbar/Navbar.jsx";
import "../cart/cart.css";
import { useEffect, useState } from "react";
import {
  removeFromCart,
  empty_cart,
} from "../../../redux/actions/serviceAction.js";
import { Link } from "react-router-dom";
import trash from "../../../Img/trash.png";
import cartElement from "../../../Img/cartElement.svg"
import Swal from "sweetalert2";

const Cart = () => {
  const dispatch = useDispatch();
  const cartStore = useSelector((state) => state.cart.elements);
  const [itemCount, setItemCount] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);

  useEffect(() => {
    setItemCount(cartStore.length);

    const totalPrice = cartStore.reduce((total, item) => total + item.costo, 0);
    setSumPrice(totalPrice);
    console.log(sumPrice);
  }, [cartStore]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    setItemCount(itemCount - 1);
  };

  const handleRemoveAll = () => {
    Swal.fire({
      title: "¿Quieres eliminar todos los servicios?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `No quiero`,
      customClass: {
        title: 'my-swal-title' // Clase CSS para aplicar estilos al título
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Servicios eliminados!",
          icon:"success",
          customClass: {
            title: 'my-swal-title' // Clase CSS para aplicar estilos al título
          }
        });
        dispatch(empty_cart())
      } else if (result.isDenied) {
        Swal.fire({
          title: "acción cancelada",
          icon: "info",
          customClass: {
            title: 'my-swal-title' // Clase CSS para aplicar estilos al título
          }
        });
      }
    });
  };

  return (
    <div className="container-cart">
      <Navbar />

      <div className="container-cart__count">
        {itemCount === 0 ? (
          <div className="cartInfo">
            <img src={cartElement} alt="" />
            <p className="cartInfo__description">Aún no tienes servicios en el carrito!</p>
            </div>
        ) : (
          <>
            {cartStore.map((item) => (
              <div key={item.id} className="card">
                <div className="cardImg">
                  <img
                    src={`http://149.50.138.150:9090/api/servicios/imagen/${item.imagen}`}
                    alt=""
                  />
                </div>

                <div className="cardinfo">
                  <p className="cardinfo__item">
                    <i
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bx bx-x btnRemove"
                    ></i>{" "}
                    <b>{item.descripcion}</b>{" "}
                  </p>

                  <p className="cardinfo__item total">${item.costo}</p>
                </div>
              </div>
            ))}

            <Link to="/payment">
              <button className="btnConfirm">Seguir con el pago</button>
            </Link>
          </>
        )}

        <div className="allPrice">
          <div className="allPriceItems">
            <p>
              <span className="totalCartPrice">Pedido Total:</span> ${sumPrice}{" "}
            </p>
            {itemCount === 0 ? null : (
              <img
                src={trash}
                alt=""
                className="empty"
                onClick={handleRemoveAll}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
