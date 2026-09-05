import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {

    const navigate = useNavigate();


    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [orderPlaced, setOrderPlaced] = useState(false);


    // Store the completed order information
    // separately before clearing the cart

    const [completedOrder, setCompletedOrder] =
        useState({
            total: 0,
            items: 0
        });


    // =========================
    // CALCULATE TOTAL
    // =========================

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    // =========================
    // TOTAL ITEMS
    // =========================

    const totalItems = cart.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );


    // =========================
    // PLACE ORDER
    // =========================

    const placeOrder = async (e) => {

        e.preventDefault();


        // Check cart

        if (cart.length === 0) {

            setMessage(
                "Your cart is empty. Please add some food first."
            );

            return;
        }


        // Check customer details

        if (!name.trim() || !email.trim()) {

            setMessage(
                "Please enter your name and email."
            );

            return;
        }


        try {

            setLoading(true);

            setMessage("");


            // Save these values BEFORE clearing cart

            const finalTotal = total;

            const finalItems = totalItems;


            // =========================
            // SEND ORDER TO BACKEND
            // =========================

            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        customerName: name,

                        customerEmail: email,

                        items: cart.map((item) => ({

                            foodId: item._id,

                            foodName: item.name,

                            price: item.price,

                            quantity: item.quantity

                        })),

                        totalAmount: finalTotal

                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to place order"
                );

            }


            // =========================
            // SAVE SUCCESS INFORMATION
            // =========================

            setCompletedOrder({

                total: finalTotal,

                items: finalItems

            });


            setOrderPlaced(true);


            setMessage(
                "Your order has been placed successfully!"
            );


            // Clear cart AFTER saving order information

            setCart([]);

            setName("");

            setEmail("");


        } catch (error) {

            console.log(
                "Order error:",
                error
            );


            setMessage(
                "Failed to place order. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // SUCCESS SCREEN
    // =========================

    if (orderPlaced) {

        return (

            <div className="checkout">

                <div className="order-success">

                    <div className="success-icon">
                        ✓
                    </div>


                    <span className="success-label">
                        ORDER CONFIRMED
                    </span>


                    <h1>
                        Order Placed Successfully!
                    </h1>


                    <p>
                        Thank you for ordering from
                        Campus Canteen.
                    </p>


                    <p>
                        Your order has been sent to
                        the canteen and will be prepared
                        shortly.
                    </p>


                    <div className="success-info">


                        {/* ITEMS */}

                        <div>

                            <span>
                                Items
                            </span>

                            <strong>
                                {completedOrder.items}
                            </strong>

                        </div>


                        {/* AMOUNT */}

                        <div>

                            <span>
                                Amount
                            </span>

                            <strong>
                                ₹{completedOrder.total}
                            </strong>

                        </div>

                    </div>


                    <button
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Back to Menu →
                    </button>

                </div>

            </div>

        );

    }


    // =========================
    // EMPTY CART
    // =========================

    if (cart.length === 0) {

        return (

            <div className="checkout">

                <div className="checkout-empty">

                    <div className="checkout-empty-icon">
                        🛒
                    </div>


                    <h1>
                        Your Cart is Empty
                    </h1>


                    <p>
                        Add some delicious food
                        before proceeding to checkout.
                    </p>


                    <button
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Browse Menu →
                    </button>

                </div>

            </div>

        );

    }


    // =========================
    // CHECKOUT PAGE
    // =========================

    return (

        <div className="checkout">


            {/* PAGE HEADER */}

            <div className="checkout-header">

                <span>
                    COMPLETE YOUR ORDER
                </span>


                <h1>
                    Checkout
                </h1>


                <p>
                    Enter your details and confirm
                    your campus food order.
                </p>

            </div>


            <div className="checkout-layout">


                {/* =====================
                    ORDER SUMMARY
                ====================== */}

                <div className="checkout-summary">

                    <div className="checkout-card-header">

                        <div>

                            <span>
                                YOUR ORDER
                            </span>

                            <h2>
                                Order Summary
                            </h2>

                        </div>


                        <div className="checkout-item-count">

                            {totalItems} items

                        </div>

                    </div>


                    <div className="checkout-items">

                        {cart.map((item) => (

                            <div
                                className="checkout-item"
                                key={item._id}
                            >


                                {/* FOOD ICON */}

                                <div className="checkout-item-icon">

                                    {item.name
                                        .toLowerCase()
                                        .includes("burger")
                                        ? "🍔"
                                        : item.name
                                            .toLowerCase()
                                            .includes("pizza")
                                            ? "🍕"
                                            : item.name
                                                .toLowerCase()
                                                .includes("pasta")
                                                ? "🍝"
                                                : item.name
                                                    .toLowerCase()
                                                    .includes("sandwich")
                                                    ? "🥪"
                                                    : item.name
                                                        .toLowerCase()
                                                        .includes("coffee")
                                                        ? "☕"
                                                        : item.name
                                                            .toLowerCase()
                                                            .includes("dosa")
                                                            ? "🥞"
                                                            : "🍽️"}

                                </div>


                                {/* FOOD INFORMATION */}

                                <div className="checkout-item-info">

                                    <h3>
                                        {item.name}
                                    </h3>


                                    <p>
                                        ₹{item.price}
                                        {" × "}
                                        {item.quantity}
                                    </p>

                                </div>


                                {/* SUBTOTAL */}

                                <strong>
                                    ₹
                                    {item.price *
                                        item.quantity}
                                </strong>

                            </div>

                        ))}

                    </div>


                    <div className="checkout-divider">
                    </div>


                    <div className="checkout-total">

                        <span>
                            Total Amount
                        </span>


                        <strong>
                            ₹{total}
                        </strong>

                    </div>

                </div>


                {/* =====================
                    CUSTOMER DETAILS
                ====================== */}

                <div className="checkout-form-card">


                    <div className="checkout-card-header">

                        <div>

                            <span>
                                CUSTOMER DETAILS
                            </span>


                            <h2>
                                Your Information
                            </h2>

                        </div>

                    </div>


                    <form onSubmit={placeOrder}>


                        {/* NAME */}

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>


                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>


                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* INFORMATION NOTE */}

                        <div className="checkout-note">

                            <span>
                                💡
                            </span>


                            <p>
                                Your order will be sent
                                directly to the campus
                                canteen for preparation.
                            </p>

                        </div>


                        {/* MESSAGE */}

                        {message && (

                            <div className="checkout-message">

                                {message}

                            </div>

                        )}


                        {/* PLACE ORDER */}

                        <button
                            className="place-order-button"
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Placing Order..."
                                : `Place Order • ₹${total}`}

                        </button>

                    </form>


                    {/* BACK */}

                    <button
                        className="back-menu-button"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        ← Back to Menu
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Checkout;