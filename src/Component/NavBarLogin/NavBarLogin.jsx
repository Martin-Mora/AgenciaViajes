import "../NavBarLogin/NavBarLogin.css"
import logo from "../../Img/Logo_agencia.svg"

const NavBarLogin = () => {
  return (
    <div className="navLogin">
      <div className="navLogin__logo">
        <img src={logo} alt="" />
      </div>
      <div className="navLogin__title">
        <h1 className="navLogin__title--title">Agencia de viajes</h1>
      </div>
    </div>
  )
}

export default NavBarLogin