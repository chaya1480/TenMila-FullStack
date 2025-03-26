import { Link } from "react-router-dom"
import "../index.css"

export const Nav = () => {
    return <nav className="navbar navbar-default">
        <div className="container-fluid">
            <ul className="nav navbar-nav">
                <span class="navbar-text">מילהTen</span>
                <li><Link to={'Register'}>הרשמה</Link></li>
                <li><Link to={'Login'}>התחברות</Link></li>
            </ul>
        </div>
    </nav>
}