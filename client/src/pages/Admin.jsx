import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

    const [foods, setFoods] = useState([]);
    const [orders, setOrders] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const [activeTab, setActiveTab] = useState("overview");


    // GET FOOD AND ORDERS
    useEffect(() => {
        getFoods();
        getOrders();
    }, []);


    const getFoods = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/foods"
            );

            setFoods(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    const getOrders = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/orders"
            );

            setOrders(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    // ADD FOOD
    const addFood = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/foods",
                {
                    name: name,
                    description: description,
                    price: Number(price),
                    category: category
                }
            );

            alert("Food added successfully!");

            setName("");
            setDescription("");
            setPrice("");
            setCategory("");

            getFoods();

        } catch (error) {

            console.log(error);

            alert("Failed to add food");

        }

    };


    // DELETE FOOD
    const deleteFood = async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/api/foods/${id}`
            );

            alert("Food deleted");

            getFoods();

        } catch (error) {

            console.log(error);

            alert("Failed to delete food");

        }

    };


    // UPDATE ORDER STATUS
    const updateStatus = async (id, status) => {

        try {

            await axios.put(
                `http://localhost:5000/api/orders/${id}`,
                {
                    status: status
                }
            );

            getOrders();

        } catch (error) {

            console.log(error);

            alert("Failed to update status");

        }

    };


    // TOTAL SALES
    const totalSales = orders.reduce(
        (sum, order) =>
            sum + order.totalAmount,
        0
    );


    // PENDING ORDERS
    const pendingOrders = orders.filter(
        (order) =>
            order.status === "Pending"
    ).length;


    // PREPARING ORDERS
    const preparingOrders = orders.filter(
        (order) =>
            order.status === "Preparing"
    ).length;


    return (

        <div className="admin-page">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                <div className="admin-brand">

                    <div className="admin-brand-icon">
                        🍽️
                    </div>

                    <div>
                        <strong>
                            Campus Canteen
                        </strong>

                        <span>
                            Admin Panel
                        </span>
                    </div>

                </div>


                <div className="admin-menu">

                    <button
                        className={
                            activeTab === "overview"
                                ? "admin-menu-active"
                                : ""
                        }
                        onClick={() =>
                            setActiveTab("overview")
                        }
                    >
                        📊
                        <span>
                            Overview
                        </span>
                    </button>


                    <button
                        className={
                            activeTab === "foods"
                                ? "admin-menu-active"
                                : ""
                        }
                        onClick={() =>
                            setActiveTab("foods")
                        }
                    >
                        🍔
                        <span>
                            Food Menu
                        </span>
                    </button>


                    <button
                        className={
                            activeTab === "orders"
                                ? "admin-menu-active"
                                : ""
                        }
                        onClick={() =>
                            setActiveTab("orders")
                        }
                    >
                        🧾
                        <span>
                            Orders
                        </span>
                    </button>

                </div>


                <div className="admin-sidebar-bottom">

                    <span>
                        Campus Canteen
                    </span>

                    <small>
                        Management System
                    </small>

                </div>

            </aside>


            {/* MAIN DASHBOARD */}

            <main className="admin-main">

                {/* HEADER */}

                <div className="admin-topbar">

                    <div>

                        <span className="admin-page-label">
                            MANAGEMENT
                        </span>

                        <h1>
                            {activeTab === "overview"
                                ? "Dashboard"
                                : activeTab === "foods"
                                    ? "Food Menu"
                                    : "Orders"}
                        </h1>

                    </div>


                    <div className="admin-status">

                        <span className="status-dot">
                        </span>

                        System Online

                    </div>

                </div>


                {/* OVERVIEW */}

                {activeTab === "overview" && (

                    <div>

                        {/* STATISTICS */}

                        <div className="admin-stats">

                            <div className="admin-stat-card">

                                <div className="admin-stat-icon">
                                    🍔
                                </div>

                                <div>

                                    <span>
                                        Total Food Items
                                    </span>

                                    <strong>
                                        {foods.length}
                                    </strong>

                                </div>

                            </div>


                            <div className="admin-stat-card">

                                <div className="admin-stat-icon">
                                    🧾
                                </div>

                                <div>

                                    <span>
                                        Total Orders
                                    </span>

                                    <strong>
                                        {orders.length}
                                    </strong>

                                </div>

                            </div>


                            <div className="admin-stat-card">

                                <div className="admin-stat-icon">
                                    ⏳
                                </div>

                                <div>

                                    <span>
                                        Pending Orders
                                    </span>

                                    <strong>
                                        {pendingOrders}
                                    </strong>

                                </div>

                            </div>


                            <div className="admin-stat-card">

                                <div className="admin-stat-icon">
                                    ₹
                                </div>

                                <div>

                                    <span>
                                        Total Sales
                                    </span>

                                    <strong>
                                        ₹{totalSales}
                                    </strong>

                                </div>

                            </div>

                        </div>


                        {/* QUICK ACTIONS */}

                        <div className="admin-section">

                            <div className="admin-section-heading">

                                <div>

                                    <span>
                                        QUICK ACTIONS
                                    </span>

                                    <h2>
                                        Manage Canteen
                                    </h2>

                                </div>

                            </div>


                            <div className="quick-actions">

                                <button
                                    onClick={() =>
                                        setActiveTab("foods")
                                    }
                                >

                                    <span>
                                        🍔
                                    </span>

                                    <div>

                                        <strong>
                                            Manage Food
                                        </strong>

                                        <small>
                                            Add or remove menu items
                                        </small>

                                    </div>

                                    →
                                </button>


                                <button
                                    onClick={() =>
                                        setActiveTab("orders")
                                    }
                                >

                                    <span>
                                        🧾
                                    </span>

                                    <div>

                                        <strong>
                                            Manage Orders
                                        </strong>

                                        <small>
                                            View and update orders
                                        </small>

                                    </div>

                                    →

                                </button>

                            </div>

                        </div>


                        {/* RECENT ORDERS */}

                        <div className="admin-section">

                            <div className="admin-section-heading">

                                <div>

                                    <span>
                                        RECENT ACTIVITY
                                    </span>

                                    <h2>
                                        Latest Orders
                                    </h2>

                                </div>

                                <button
                                    className="view-all-button"
                                    onClick={() =>
                                        setActiveTab("orders")
                                    }
                                >
                                    View All →
                                </button>

                            </div>


                            {orders.length === 0 ? (

                                <div className="admin-empty">
                                    <div>
                                        🧾
                                    </div>

                                    <h3>
                                        No orders yet
                                    </h3>

                                    <p>
                                        Orders will appear here
                                        when customers place them.
                                    </p>
                                </div>

                            ) : (

                                <div className="admin-order-list">

                                    {orders.slice(0, 5).map(
                                        (order) => (

                                            <div
                                                className="admin-order-row"
                                                key={order._id}
                                            >

                                                <div className="order-number">
                                                    #{order._id.slice(-6)}
                                                </div>

                                                <div className="order-customer">

                                                    <strong>
                                                        {order.customerName}
                                                    </strong>

                                                    <span>
                                                        {order.customerEmail}
                                                    </span>

                                                </div>

                                                <div className="order-amount">
                                                    ₹{order.totalAmount}
                                                </div>

                                                <div
                                                    className={
                                                        `order-status ${order.status
                                                            .toLowerCase()
                                                            .replace(
                                                                " ",
                                                                "-"
                                                            )}`
                                                    }
                                                >
                                                    {order.status}
                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    </div>

                )}


                {/* FOOD MENU */}

                {activeTab === "foods" && (

                    <div>

                        <div className="admin-grid">

                            {/* ADD FOOD */}

                            <div className="admin-panel">

                                <div className="admin-panel-heading">

                                    <span>
                                        NEW ITEM
                                    </span>

                                    <h2>
                                        Add Food
                                    </h2>

                                    <p>
                                        Add a new item to the
                                        campus canteen menu.
                                    </p>

                                </div>


                                <form
                                    className="admin-form"
                                    onSubmit={addFood}
                                >

                                    <div className="admin-form-group">

                                        <label>
                                            Food Name
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Example: Masala Dosa"
                                            value={name}
                                            onChange={(e) =>
                                                setName(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="admin-form-group">

                                        <label>
                                            Description
                                        </label>

                                        <textarea
                                            placeholder="Describe the food item..."
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="admin-form-row">

                                        <div className="admin-form-group">

                                            <label>
                                                Price
                                            </label>

                                            <input
                                                type="number"
                                                placeholder="₹ 150"
                                                value={price}
                                                onChange={(e) =>
                                                    setPrice(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />

                                        </div>


                                        <div className="admin-form-group">

                                            <label>
                                                Category
                                            </label>

                                            <select
                                                value={category}
                                                onChange={(e) =>
                                                    setCategory(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            >

                                                <option value="">
                                                    Select
                                                </option>

                                                <option value="Fast Food">
                                                    Fast Food
                                                </option>

                                                <option value="Main Course">
                                                    Main Course
                                                </option>

                                                <option value="Snacks">
                                                    Snacks
                                                </option>

                                                <option value="Drinks">
                                                    Drinks
                                                </option>

                                            </select>

                                        </div>

                                    </div>


                                    <button
                                        className="admin-submit-button"
                                        type="submit"
                                    >
                                        + Add Food Item
                                    </button>

                                </form>

                            </div>


                            {/* FOOD LIST */}

                            <div className="admin-panel">

                                <div className="admin-panel-heading">

                                    <span>
                                        MENU
                                    </span>

                                    <h2>
                                        Food Items
                                    </h2>

                                    <p>
                                        {foods.length} items currently
                                        available in the menu.
                                    </p>

                                </div>


                                <div className="admin-food-list">

                                    {foods.map((food) => (

                                        <div
                                            className="admin-food-row"
                                            key={food._id}
                                        >

                                            <div className="admin-food-icon">

                                                {food.name
                                                    .toLowerCase()
                                                    .includes("burger")
                                                    ? "🍔"
                                                    : food.name
                                                        .toLowerCase()
                                                        .includes("pizza")
                                                        ? "🍕"
                                                        : food.name
                                                            .toLowerCase()
                                                            .includes("pasta")
                                                            ? "🍝"
                                                            : food.name
                                                                .toLowerCase()
                                                                .includes("sandwich")
                                                                ? "🥪"
                                                                : food.name
                                                                    .toLowerCase()
                                                                    .includes("coffee")
                                                                    ? "☕"
                                                                    : food.name
                                                                        .toLowerCase()
                                                                        .includes("dosa")
                                                                        ? "🥞"
                                                                        : "🍽️"}

                                            </div>


                                            <div className="admin-food-info">

                                                <strong>
                                                    {food.name}
                                                </strong>

                                                <span>
                                                    {food.category}
                                                </span>

                                            </div>


                                            <strong className="admin-food-price">
                                                ₹{food.price}
                                            </strong>


                                            <button
                                                className="delete-food-button"
                                                onClick={() =>
                                                    deleteFood(
                                                        food._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                )}


                {/* ORDERS */}

                {activeTab === "orders" && (

                    <div className="admin-section">

                        <div className="admin-section-heading">

                            <div>

                                <span>
                                    ORDER MANAGEMENT
                                </span>

                                <h2>
                                    Customer Orders
                                </h2>

                            </div>

                            <button
                                className="refresh-button"
                                onClick={getOrders}
                            >
                                ↻ Refresh
                            </button>

                        </div>


                        {orders.length === 0 ? (

                            <div className="admin-empty">

                                <div>
                                    🧾
                                </div>

                                <h3>
                                    No orders yet
                                </h3>

                                <p>
                                    Customer orders will
                                    appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="orders-table">

                                <div className="orders-table-header">

                                    <span>
                                        ORDER
                                    </span>

                                    <span>
                                        CUSTOMER
                                    </span>

                                    <span>
                                        ITEMS
                                    </span>

                                    <span>
                                        TOTAL
                                    </span>

                                    <span>
                                        STATUS
                                    </span>

                                    <span>
                                        ACTION
                                    </span>

                                </div>


                                {orders.map((order) => (

                                    <div
                                        className="orders-table-row"
                                        key={order._id}
                                    >

                                        <span className="table-order-id">
                                            #{order._id.slice(-6)}
                                        </span>


                                        <div className="table-customer">

                                            <strong>
                                                {order.customerName}
                                            </strong>

                                            <small>
                                                {order.customerEmail}
                                            </small>

                                        </div>


                                        <span>
                                            {order.items.reduce(
                                                (sum, item) =>
                                                    sum +
                                                    item.quantity,
                                                0
                                            )}
                                        </span>


                                        <strong>
                                            ₹{order.totalAmount}
                                        </strong>


                                        <span
                                            className={
                                                `order-status ${order.status
                                                    .toLowerCase()
                                                    .replace(
                                                        " ",
                                                        "-"
                                                    )}`
                                            }
                                        >
                                            {order.status}
                                        </span>


                                        <div className="order-actions">

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        order._id,
                                                        "Preparing"
                                                    )
                                                }
                                            >
                                                Preparing
                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        order._id,
                                                        "Ready"
                                                    )
                                                }
                                            >
                                                Ready
                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        order._id,
                                                        "Completed"
                                                    )
                                                }
                                            >
                                                Completed
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                )}

            </main>

        </div>

    );

}

export default Admin;