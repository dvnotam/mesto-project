import logo from "../images/logo.svg"
import { Link, useLocation } from 'react-router-dom'

function Header (props) {
    const location = useLocation()
    return (
        <header className="header">
            <img src={logo} alt="Место" className="logo" />
            <div className="navigation">
                {props.loggedIn ? (
                    <>
                        <p className="navigation__email">{props.userEmail}</p>
                        <Link className="navigation__login" to="/sign-in" onClick={props.onLogOut}>Выйти</Link>
                    </>
                ) : (
                    <Link className="navigation__login" to={`${location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`}>
                        {`${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`}
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Header;