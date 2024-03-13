import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../Navbar/Navbar.jsx";
import "../cart/cart.css";
import { useEffect, useState } from "react";
import { removeFromCart } from "../../../redux/actions/serviceAction.js";
import imgNot from "../../../Img/imgNot.svg"

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

  return (
    <div className="container-cart">
      <Navbar />

      <div className="container-cart__count">
        {itemCount === 0 ? (
          <h2>Aun no hay nada en el carrito</h2>
        ) : (
          <>

            {cartStore.map((item) => (
              <div key={item.id} className="card">
                <div className="cardImg">
                  <img src={imgNot} alt="" />
                </div>

                <div className="cardinfo">
                  <p className="cardinfo__item">
                  <i onClick={() => handleRemoveFromCart(item.id)} className='bx bx-x btnRemove'></i>
                    {" "}
                    <b>{item.descripcion}</b>{" "}
                  </p>

                  <p className="cardinfo__item total">${item.costo}</p>
                  
                  
                </div>
              </div>

              
            ))}

          <button className="btnConfirm">confirmar pago</button>
          </>
        )}

        <div className="allPrice">
         <p>Total: ${sumPrice} </p> 
          
          </div>    
      </div>
    </div>
  );
};

export default Cart;
