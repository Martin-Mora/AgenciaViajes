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
import cartElement from "../../../Img/cartElement.svg";
import Swal from "sweetalert2";

const Cart = () => {
  const dispatch = useDispatch();
  const cartStore = useSelector((state) => state.cart.elements);
  const [itemCount, setItemCount] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Definir el método de pago por defecto
  const [commissionRate, setCommissionRate] = useState(0); // Tasa de comisión por defecto

  useEffect(() => {
    setItemCount(cartStore.length);
    const totalPrice = cartStore.reduce((total, item) => total + item.costo, 0);
    setSumPrice(totalPrice + (totalPrice * commissionRate) / 100); // Agregar comisión al precio total
  }, [cartStore, commissionRate]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    setItemCount(itemCount - 1);
  };

  // Función para manejar cambios en el método de pago
  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
    // Actualizar tasa de comisión según el método de pago seleccionado
    switch (selectedMethod) {
      case "debit":
        setCommissionRate(3);
        break;
      case "credit":
        setCommissionRate(9);
        break;
      case "transfer":
        setCommissionRate(2.45);
        break;
      default:
        setCommissionRate(0);
    }
  };

  const handleRemoveAll = () => {
    Swal.fire({
      title: "¿Quieres eliminar todos los servicios?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `No quiero`,
      customClass: {
        title: "my-swal-title", 
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Servicios eliminados!",
          icon: "success",
          customClass: {
            title: "my-swal-title", 
          },
        });
        dispatch(empty_cart());
      } else if (result.isDenied) {
        Swal.fire({
          title: "acción cancelada",
          icon: "info",
          customClass: {
            title: "my-swal-title", 
          },
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
            <p className="cartInfo__description">
              Aún no tienes servicios en el carrito!
            </p>
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
          </>
        )}

            {itemCount === 0 ? null : (
        <div className="allPrice">
          <div className="paymentMethod">
            <select value={paymentMethod} onChange={handlePaymentMethodChange}>
              <option value="cash">Efectivo</option>
              <option value="debit">Tarjeta de Débito - 3%</option>
              <option value="credit">Tarjeta de Crédito - 9%</option>
              <option value="virtual">Monedero Virtual</option>
              <option value="transfer">Transferencia - 2.45%</option>
            </select>
          </div>

          <div className="allPriceItems">
            <p>
              <span className="totalCartPrice">Pedido Total:</span> ${sumPrice}{" "}
            </p>
              <img
                src={trash}
                alt=""
                className="empty"
                onClick={handleRemoveAll}
              />
            
<Link to="/payment">
              <button className="btnConfirm">Seguir con el pago</button>
            </Link>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default Cart;
