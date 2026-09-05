import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {

    const navigate = useNavigate();


    // Increase quantity
    const increaseQuantity = (id) => {

        setCart((currentCart) =>
            currentCart.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity + 1
                    }
                    : item
            )
        );

    };


    // Decrease quantity
    const decreaseQuantity = (id) => {

        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item._id === id
                        ? {
                            ...item,
                            quantity:
                                item.quantity - 1
                        }
                        : item
                )
                .filter(
                    (item) =>
                        item.quantity > 0
                )
        );

    };


    // Calculate total
    const total = cart.reduce(
        (sum, item) =>
            sum +
            item.price *
            item.quantity,
        0
    );


    // Total number of items
    const totalItems = cart.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );


    return (

        <div className="cart-section">

            <div className="cart-header">

                <div>

                    <span className="cart-label">
                        YOUR ORDER
                    </span>

                    <h1>
                        Shopping Cart
                    </h1>

                </div>

                <span className="cart-count">
                    {totalItems} items
                </span>

            </div>


            {cart.length === 0 ? (

                /* EMPTY CART */

                <div className="empty-cart">

                    <div className="empty-cart-icon">
                        🛒
                    </div>

                    <h2>
                        Your cart is empty
                    </h2>

                    <p>
                        Add something delicious
                        from the menu to get started.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Browse Menu
                    </button>

                </div>

            ) : (

                /* CART WITH ITEMS */

                <div className="cart-content">

                    <div className="cart-items">

                        {cart.map((item) => (

                            <div
                                className="cart-item"
                                key={item._id}
                            >

                                <div className="cart-item-icon">

                                    {item.name
                                        .toLowerCase()
                                        .includes(
                                            "burger"
                                        )
                                        ? "🍔"
                                        : item.name
                                            .toLowerCase()
                                            .includes(
                                                "pizza"
                                            )
                                            ? "🍕"
                                            : item.name
                                                .toLowerCase()
                                                .includes(
                                                    "pasta"
                                                )
                                                ? "🍝"
                                                : item.name
                                                    .toLowerCase()
                                                    .includes(
                                                        "coffee"
                                                    )
                                                    ? "☕"
                                                    : item.name
                                                        .toLowerCase()
                                                        .includes(
                                                            "dosa"
                                                        )
                                                        ? "🥞"
                                                        : "🍽️"}

                                </div>


                                <div className="cart-item-details">

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        ₹{item.price} each
                                    </p>

                                </div>


                                <div className="quantity-controls">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(
                                                item._id
                                            )
                                        }
                                    >
                                        −
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(
                                                item._id
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                <div className="cart-item-subtotal">

                                    ₹
                                    {item.price *
                                        item.quantity}

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* ORDER SUMMARY */}

                    <div className="cart-summary">

                        <h2>
                            Order Summary
                        </h2>

                        <div className="summary-row">

                            <span>
                                Items
                            </span>

                            <span>
                                {totalItems}
                            </span>

                        </div>


                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>

                            <span>
                                ₹{total}
                            </span>

                        </div>


                        <div className="summary-divider">
                        </div>


                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹{total}
                            </strong>

                        </div>


                        <button
                            className="checkout-button"
                            onClick={() =>
                                navigate(
                                    "/checkout"
                                )
                            }
                        >
                            Proceed to Checkout →
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Cart;