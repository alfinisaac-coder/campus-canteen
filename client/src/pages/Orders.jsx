import { useState } from "react";

function Orders() {

    const [email, setEmail] = useState("");

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(false);

    const [searched, setSearched] = useState(false);


    // =========================
    // SEARCH CUSTOMER ORDERS
    // =========================

    const searchOrders = async (e) => {

        e.preventDefault();


        if (!email.trim()) {
            return;
        }


        try {

            setLoading(true);

            setSearched(false);


            const response = await fetch(
                `https://campus-canteen-c6u1.onrender.com/api/orders/customer?email=${encodeURIComponent(
                    email.trim()
                )}`
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to fetch orders"
                );

            }


            setOrders(data);

            setSearched(true);

        } catch (error) {

            console.log(
                "Order history error:",
                error
            );

            setOrders([]);

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // STATUS CLASS
    // =========================

    const getStatusClass = (status) => {

        return `tracking-status ${status
            .toLowerCase()
            .replace(" ", "-")}`;

    };


    // =========================
    // CHECK IF STEP IS COMPLETED
    // =========================

    const isStepCompleted = (orderStatus, step) => {

        const statusOrder = {
            Pending: 1,
            Preparing: 2,
            Ready: 3,
            Completed: 4
        };


        return statusOrder[orderStatus] >= statusOrder[step];

    };


    return (

        <div className="orders-page">


            {/* =====================
                PAGE HEADER
            ====================== */}

            <div className="orders-page-header">

                <span>
                    ORDER HISTORY
                </span>

                <h1>
                    My Orders
                </h1>

                <p>
                    Enter your email to view and track
                    your campus canteen orders.
                </p>

            </div>


            {/* =====================
                SEARCH
            ====================== */}

            <form
                className="orders-search"
                onSubmit={searchOrders}
            >

                <div className="orders-search-input">

                    <span>
                        ✉️
                    </span>

                    <input
                        type="email"
                        placeholder="Enter the email used for your order"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                </div>


                <button type="submit">

                    {loading
                        ? "Searching..."
                        : "Find My Orders →"}

                </button>

            </form>


            {/* =====================
                NO ORDERS
            ====================== */}

            {searched && orders.length === 0 && (

                <div className="orders-empty">

                    <div>
                        🔎
                    </div>

                    <h2>
                        No Orders Found
                    </h2>

                    <p>
                        We couldn't find any orders
                        associated with this email.
                    </p>

                </div>

            )}


            {/* =====================
                CUSTOMER ORDERS
            ====================== */}

            {orders.length > 0 && (

                <div className="customer-orders">


                    {/* RESULT HEADER */}

                    <div className="orders-result-header">

                        <div>

                            <span>
                                YOUR ORDERS
                            </span>

                            <h2>
                                Order History
                            </h2>

                        </div>


                        <strong>
                            {orders.length} orders
                        </strong>

                    </div>


                    {/* ORDER CARDS */}

                    {orders.map((order) => (

                        <div
                            className="customer-order-card"
                            key={order._id}
                        >


                            {/* =====================
                                ORDER INFORMATION
                            ====================== */}

                            <div className="customer-order-top">


                                <div>

                                    <span>
                                        ORDER ID
                                    </span>

                                    <strong>
                                        #{order._id.slice(-8)}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        DATE
                                    </span>

                                    <strong>
                                        {new Date(
                                            order.orderDate
                                        ).toLocaleDateString()}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        TOTAL
                                    </span>

                                    <strong>
                                        ₹{order.totalAmount}
                                    </strong>

                                </div>


                                <div
                                    className={
                                        getStatusClass(
                                            order.status
                                        )
                                    }
                                >
                                    {order.status}
                                </div>

                            </div>


                            {/* =====================
                                ORDER ITEMS
                            ====================== */}

                            <div className="customer-order-items">

                                {order.items.map(
                                    (item, index) => (

                                        <div
                                            className="customer-order-item"
                                            key={index}
                                        >

                                            <div>

                                                <strong>
                                                    {item.foodName}
                                                </strong>

                                                <span>
                                                    ₹{item.price}
                                                    {" × "}
                                                    {item.quantity}
                                                </span>

                                            </div>


                                            <strong>
                                                ₹
                                                {item.price *
                                                    item.quantity}
                                            </strong>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* =====================
                                ORDER TRACKING
                            ====================== */}

                            <div className="order-tracking">


                                {/* ORDER PLACED */}

                                <div
                                    className={
                                        isStepCompleted(
                                            order.status,
                                            "Pending"
                                        )
                                            ? "tracking-step active completed"
                                            : "tracking-step"
                                    }
                                >

                                    <div>

                                        {isStepCompleted(
                                            order.status,
                                            "Pending"
                                        )
                                            ? "✓"
                                            : "1"}

                                    </div>

                                    <span>
                                        Order Placed
                                    </span>

                                </div>


                                {/* PREPARING */}

                                <div
                                    className={
                                        isStepCompleted(
                                            order.status,
                                            "Preparing"
                                        )
                                            ? "tracking-step active completed"
                                            : "tracking-step"
                                    }
                                >

                                    <div>

                                        {isStepCompleted(
                                            order.status,
                                            "Preparing"
                                        )
                                            ? "✓"
                                            : "2"}

                                    </div>

                                    <span>
                                        Preparing
                                    </span>

                                </div>


                                {/* READY */}

                                <div
                                    className={
                                        isStepCompleted(
                                            order.status,
                                            "Ready"
                                        )
                                            ? "tracking-step active completed"
                                            : "tracking-step"
                                    }
                                >

                                    <div>

                                        {isStepCompleted(
                                            order.status,
                                            "Ready"
                                        )
                                            ? "✓"
                                            : "3"}

                                    </div>

                                    <span>
                                        Ready
                                    </span>

                                </div>


                                {/* COMPLETED */}

                                <div
                                    className={
                                        isStepCompleted(
                                            order.status,
                                            "Completed"
                                        )
                                            ? "tracking-step active completed"
                                            : "tracking-step"
                                    }
                                >

                                    <div>

                                        {isStepCompleted(
                                            order.status,
                                            "Completed"
                                        )
                                            ? "✓"
                                            : "4"}

                                    </div>

                                    <span>
                                        Completed
                                    </span>

                                </div>


                            </div>


                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default Orders;