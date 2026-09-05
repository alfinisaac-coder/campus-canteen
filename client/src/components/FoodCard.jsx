function FoodCard({ food, addToCart }) {

    const getFoodEmoji = () => {

        const foodName = food.name.toLowerCase();

        if (foodName.includes("burger")) {
            return "🍔";
        }

        if (foodName.includes("pizza")) {
            return "🍕";
        }

        if (foodName.includes("pasta")) {
            return "🍝";
        }

        if (foodName.includes("sandwich")) {
            return "🥪";
        }

        if (foodName.includes("coffee")) {
            return "☕";
        }

        if (foodName.includes("dosa")) {
            return "🥞";
        }

        if (
            foodName.includes("juice") ||
            foodName.includes("drink") ||
            foodName.includes("tea")
        ) {
            return "🥤";
        }

        return "🍽️";
    };


    return (
        <div className="food-card">

            <div className="food-image">

                <div className="food-emoji">
                    {getFoodEmoji()}
                </div>

            </div>


            <div className="food-content">

                <div className="food-category">
                    {food.category}
                </div>


                <h2>
                    {food.name}
                </h2>


                <p className="food-description">
                    {food.description}
                </p>


                <div className="food-bottom">

                    <h3>
                        ₹{food.price}
                    </h3>


                    <button
                        onClick={() => addToCart(food)}
                    >
                        + Add
                    </button>

                </div>

            </div>

        </div>
    );
}

export default FoodCard;