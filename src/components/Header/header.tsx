import {assignActivePageClass} from "../../utils/utils";
import { useNavigate,useLocation } from 'react-router-dom';
import './header.css'
const Header = () => {
    const navigate = useNavigate()
    const location = useLocation();

    return (
        <header className="header">
            <div className="header-container">
                <h2 onClick={() => navigate("/")}>Transportly</h2>
            </div>
            <nav>
                <ul>
                    <li
                        className={assignActivePageClass(
                            location.pathname,
                            "/flights" || "/flight"
                        )}
                        onClick={() => navigate("/flights")}
                    >
                        Flights
                    </li>
                    <li
                        className={assignActivePageClass(
                            location.pathname,
                            "/orders"
                        )}
                        onClick={() => navigate("/orders")}
                    >
                        Orders
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default (Header);
