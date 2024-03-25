import "../Login/Login.css"

// import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch,} from "react-redux"
import { signIn } from "../../../redux/actions/userAction";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const [passwordEmailError, passwordEmailErrorState] = useState();

  const password = useRef();
  const email = useRef();

  let hasError = false;

  const errorLogin = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (password.current.value === "") {
      passwordEmailErrorState("Email o password incorrectos");
      hasError = true;
    } else {
      passwordEmailErrorState("");
    }

    if (!emailRegex.test(email.current.value)) {
      passwordEmailErrorState("Email o password incorrectos");
      hasError = true;
    } else {
      passwordEmailErrorState("");
    }

    return hasError;
  };

  const handlePrevent = (e) => {
    e.preventDefault();
    const hasError = errorLogin();

    if (!hasError) {
      const signInDataBody = {
        email: email.current.value.toLowerCase(),
        password: password.current.value,
      };

      Toastify({
        text: "verificando...",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background:
            " linear-gradient(175deg, #fff67e 0, #ffe56d 16.67%, #ffcd56 33.33%, #ffae38 50%, #f08f19 66.67%, #e77502 83.33%, #e46002 100%)",
        },
      }).showToast();
      setTimeout(() => {
        dispatch(signIn(signInDataBody)).then((algo) => {
          if (algo.payload.message || algo.payload.details) {
            alert("Email or password incorrect");
          } else {
            navigate("/home");
          }
        });
      }, 2000);
    }
  };



  return (

    <>
    
    <div className="loginContainer">
      

    <div className="loginContainer__input">
      <div className="form-group">
        <input name="email" type="text" ref={email} required />
        <label>Email</label>
        
      </div>

      <div className="form-group">
        <input name="password" type="password" ref={password}  required />
        <label>Password</label>
       
      </div>
      <p
              className={`error-message ${
                passwordEmailError
                  ? "error-message-block"
                  : "error-message-hidden"
              }`}
            >
              {passwordEmailError}
            </p>
    </div>

    <button type="submit" onClick={handlePrevent}>Entrar</button>
  </div>
  </>
  )
}

export default Login