import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import FoodCard from "./components/FoodCard";
import Cart from "./components/Cart";

import "./style.css";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";


function App() {

    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const [cart, setCart] = useState([]);

    const [showCart, setShowCart] = useState(false);


    // =========================
    // GET FOOD
    // =========================

    useEffect(() => {

        fetch("https://campus-canteen-c6u1.onrender.com/api/foods")

            .then((response) => {

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch food data"
                    );
                }

                return response.json();

            })

            .then((data) => {

                setFoods(data);

            })

            .catch((error) => {

                console.log(
                    "Food fetch error:",
                    error
                );

            });

    }, []);


    // =========================
    // FILTER FOOD
    // =========================

    const filteredFoods = foods.filter((food) => {

        const matchesSearch =
            food.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                );


        const matchesCategory =
            category === "All" ||
            food.category === category;


        return (
            matchesSearch &&
            matchesCategory
        );

    });


    // =========================
    // ADD TO CART
    // =========================

    const addToCart = (food) => {

        setCart((currentCart) => {

            const existingFood =
                currentCart.find(
                    (item) =>
                        item._id === food._id
                );


            if (existingFood) {

                return currentCart.map(
                    (item) =>
                        item._id === food._id
                            ? {
                                ...item,
                                quantity:
                                    item.quantity + 1
                            }
                            : item
                );

            }


            return [
                ...currentCart,

                {
                    ...food,
                    quantity: 1
                }
            ];

        });

    };


    // =========================
    // HOME PAGE
    // =========================

    const Home = () => {

        return (

            <div className="home-container">


                {/* =====================
                    HERO SECTION
                ====================== */}

                <section className="hero-section">

                    <div className="hero-content">

                        <div className="hero-badge">
                            🍴 Campus Food Ordering
                        </div>


                        <h1>
                            Your Campus.
                            <br />
                            Your Food.
                            <br />
                            Your Choice.
                        </h1>


                        <p>
                            Fresh food, quick ordering,
                            and easy pickup — all from
                            your campus canteen.
                        </p>


                        <button
                            className="hero-button"
                            onClick={() => {

                                document
                                    .getElementById(
                                        "menu"
                                    )
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    });

                            }}
                        >
                            Explore Menu →
                        </button>

                    </div>


                    <div className="hero-food">

                        <div className="hero-food-circle">
                            🍔
                        </div>

                        <div className="hero-floating-card">
                            <span>⭐</span>

                            <div>

                                <strong>
                                    Fresh & Tasty
                                </strong>

                                <small>
                                    Made for campus life
                                </small>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================
                    MENU SECTION
                ====================== */}

                <section
                    id="menu"
                    className="menu-section"
                >

                    <div className="section-heading">

                        <div>

                            <span>
                                EXPLORE
                            </span>

                            <h2>
                                Browse Our Menu
                            </h2>

                        </div>

                        <p>
                            Find something delicious
                            for your next meal.
                        </p>

                    </div>


                    {/* CATEGORIES */}

                    <div className="category-container">

                        <button
                            className={
                                category === "All"
                                    ? "category-active"
                                    : ""
                            }
                            onClick={() =>
                                setCategory("All")
                            }
                        >
                            All
                        </button>


                        <button
                            className={
                                category === "Fast Food"
                                    ? "category-active"
                                    : ""
                            }
                            onClick={() =>
                                setCategory(
                                    "Fast Food"
                                )
                            }
                        >
                            🍔 Fast Food
                        </button>


                        <button
                            className={
                                category === "Main Course"
                                    ? "category-active"
                                    : ""
                            }
                            onClick={() =>
                                setCategory(
                                    "Main Course"
                                )
                            }
                        >
                            🍛 Main Course
                        </button>


                        <button
                            className={
                                category === "Snacks"
                                    ? "category-active"
                                    : ""
                            }
                            onClick={() =>
                                setCategory(
                                    "Snacks"
                                )
                            }
                        >
                            🍟 Snacks
                        </button>


                        <button
                            className={
                                category === "Drinks"
                                    ? "category-active"
                                    : ""
                            }
                            onClick={() =>
                                setCategory(
                                    "Drinks"
                                )
                            }
                        >
                            🥤 Drinks
                        </button>

                    </div>


                    {/* SEARCH */}

                    <div className="search-container">

                        <span>
                            🔎
                        </span>

                        <input
                            className="search-box"
                            type="text"
                            placeholder="Search for food..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* FOOD */}

                    <div className="food-heading">

                        <h2>
                            Popular Menu
                        </h2>

                        <span>
                            {filteredFoods.length} items
                        </span>

                    </div>


                    <div className="food-container">

                        {filteredFoods.length === 0 ? (

                            <div className="no-food">

                                <div>
                                    🔍
                                </div>

                                <h3>
                                    No food found
                                </h3>

                                <p>
                                    Try another search
                                    or category.
                                </p>

                            </div>

                        ) : (

                            filteredFoods.map(
                                (food) => (

                                    <FoodCard
                                        key={
                                            food._id
                                        }
                                        food={food}
                                        addToCart={
                                            addToCart
                                        }
                                    />

                                )
                            )

                        )}

                    </div>

                </section>


                {/* =====================
                    CART
                ====================== */}

                {showCart && (

                    <Cart
                        cart={cart}
                        setCart={setCart}
                    />

                )}

            </div>

        );

    };


    // =========================
    // ROUTES
    // =========================

    return (

        <BrowserRouter>

            <Navbar
                cartCount={cart.length}
                onCartClick={() =>
                    setShowCart(
                        (current) =>
                            !current
                    )
                }
            />


            <Routes>

                {/* HOME */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* CHECKOUT */}

                <Route
                    path="/checkout"
                    element={
                        <Checkout
                            cart={cart}
                            setCart={setCart}
                        />
                    }
                />


                {/* ADMIN */}

                <Route
                    path="/admin"
                    element={<Admin />}
                />


                {/* CUSTOMER ORDERS */}

                <Route
                    path="/orders"
                    element={<Orders />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;