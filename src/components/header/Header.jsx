import { useContext, useState } from "react";
import img from "../../assets/logo.png";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout} = useContext(AuthContext)

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };
    

    return (
        <>
            <header>
            
                <div className="logo">
                    <img src={img} alt="Logo" />
                </div>
                <div className="nav-list">
                    <ul className="nav">
                       <Link to="/"><li>Home</li></Link>
                       <Link to="/booking"><li>Reservation</li></Link>
                        <Link to="/contact"><li>Contact</li></Link>
                        <li className="btn-logout" onClick={logout}>Logout</li>
                        <Link to="/profile"><li className="fa fa-user"></li></Link>
                    </ul>
                </div>
                <div className="toggle_btn" onClick={toggleMenu}>
                    <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                </div>
            </header>
            {isOpen && (
                <div className="dropdown_menu ">
                    <ul className="nav">
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/booking"><li>Reservation</li></Link>
                        <li>Contact</li>
                        <li onClick={logout}>Logout</li>
                        <Link to="/profile"><li className="fa fa-user"></li></Link>
                    </ul>
                </div>
            )}
        </>
    );
}