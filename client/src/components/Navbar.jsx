import { Link } from "react-router-dom";

function Navbar({ cartCount, onCartClick }) {

    return (

        <nav className="navbar">


            {/* LOGO */}

            <Link
                to="/"
                className="navbar-logo"
            >
                🍽️ Campus Canteen
            </Link>


            {/* NAVIGATION */}

            <div className="navbar-buttons">


                {/* HOME */}

                <Link
                    to="/"
                    className="nav-link"
                >
                    Home
                </Link>


                {/* MENU */}

                <Link
                    to="/"
                    className="nav-link"
                >
                    Menu
                </Link>


                {/* MY ORDERS */}

                <Link
                    to="/orders"
                    className="nav-link"
                >
                    My Orders
                </Link>


                {/* CART */}

                <button
                    onClick={onCartClick}
                >
                    🛒 Cart ({cartCount})
                </button>


                {/* ADMIN */}

                <Link
                    to="/admin"
                    className="nav-link admin-link"
                >
                    Admin
                </Link>

            </div>

        </nav>

    );

}

export default Navbar;