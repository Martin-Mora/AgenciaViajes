import { useState, useEffect } from 'react';
import "./CartItem.css";
import { useSelector } from 'react-redux';

const CartItem = () => {
  // Obtener el estado del carrito desde Redux
  const cartStore = useSelector((state) => state.cart.elements);
  

  // Estado local para almacenar la cantidad de elementos en el carrito
  const [itemCount, setItemCount] = useState(0);

  // Actualizar el contador cuando cambia el estado del carrito
  useEffect(() => {
    setItemCount(cartStore.length);
  }, [cartStore]);

  return (
    <div className="cart-item">
      {/* Icono del carrito */}
      <div className="cart-icon">
        <i className='bx bxs-cart'></i>
      </div>
      {/* Contador de elementos */}
      {itemCount > 0 && (
        <div className="item-count">{itemCount}</div>
      )}
    </div>
  );
};

export default CartItem;

