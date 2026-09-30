/* ================= PRODUCTS ================= */

const products = [
    {
        id: 1,
        name: "Classic Hoodie",
        category: "Fashion",
        price: 39.99,
        icon: "👕",
        description: "Comfortable everyday hoodie."
    },

    {
        id: 2,
        name: "Running Shoes",
        category: "Fashion",
        price: 59.99,
        icon: "👟",
        description: "Lightweight shoes for active days."
    },

    {
        id: 3,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 49.99,
        icon: "🎧",
        description: "Enjoy clear wireless audio."
    },

    {
        id: 4,
        name: "Smart Watch",
        category: "Electronics",
        price: 79.99,
        icon: "⌚",
        description: "Track your everyday activities."
    },

    {
        id: 5,
        name: "Coffee Maker",
        category: "Home",
        price: 44.99,
        icon: "☕",
        description: "Make fresh coffee at home."
    },

    {
        id: 6,
        name: "Table Lamp",
        category: "Home",
        price: 29.99,
        icon: "💡",
        description: "Modern lamp for your workspace."
    },

    {
        id: 7,
        name: "Leather Wallet",
        category: "Accessories",
        price: 24.99,
        icon: "👛",
        description: "Compact and stylish wallet."
    },

    {
        id: 8,
        name: "Sunglasses",
        category: "Accessories",
        price: 19.99,
        icon: "🕶️",
        description: "Classic sunglasses for everyday use."
    }
];


/* ================= CART ================= */

let cart = JSON.parse(localStorage.getItem("shopEaseCart")) || [];

let currentCategory = "All";


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts() {

    const productGrid = document.getElementById("productGrid");

    const searchValue =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const filteredProducts = products.filter(product => {

        const matchesCategory =
            currentCategory === "All" ||
            product.category === currentCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;

    });


    productGrid.innerHTML = "";


    filteredProducts.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-bottom">

                    <span class="price">
                        €${product.price.toFixed(2)}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})">
                        +
                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });


    const noProducts =
        document.getElementById("noProducts");


    noProducts.style.display =
        filteredProducts.length === 0
            ? "block"
            : "none";

}


/* ================= FILTER ================= */

function filterCategory(category, button) {

    currentCategory = category;


    document
        .querySelectorAll(".category-btn")
        .forEach(btn => {
            btn.classList.remove("active");
        });


    button.classList.add("active");


    displayProducts();

}


/* ================= ADD TO CART ================= */

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);


    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    openCart();

}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
    );

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const totalPrice =
        cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        `€${totalPrice.toFixed(2)}`;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-icon">
                ${item.icon}
            </div>

            <div>

                <h4>${item.name}</h4>

                <span class="cart-item-price">
                    €${item.price.toFixed(2)}
                </span>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>

            <strong>
                €${(item.price * item.quantity).toFixed(2)}
            </strong>

        `;


        cartItems.appendChild(cartItem);

    });

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    saveCart();

    updateCart();

}


/* ================= REMOVE ================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("overlay")
        .classList.remove("active");

}


/* ================= CHECKOUT ================= */

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty. Add a product first.");

        return;

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    document.getElementById("checkoutTotal")
        .textContent =
        `€${total.toFixed(2)}`;


    document
        .getElementById("checkoutModal")
        .classList.add("active");

}


/* ================= CLOSE CHECKOUT ================= */

function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");

}


/* ================= PLACE ORDER ================= */

document
    .getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const orderNumber =
            "SE" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        document
            .getElementById("orderNumber")
            .textContent = orderNumber;


        document
            .getElementById("checkoutFormArea")
            .style.display = "none";


        document
            .getElementById("orderSuccess")
            .style.display = "block";


        localStorage.setItem(
            "lastShopEaseOrder",
            orderNumber
        );

});


/* ================= FINISH ORDER ================= */

function finishOrder() {

    cart = [];

    saveCart();

    updateCart();

    document
        .getElementById("checkoutForm")
        .reset();


    document
        .getElementById("checkoutFormArea")
        .style.display = "block";


    document
        .getElementById("orderSuccess")
        .style.display = "none";


    closeCheckout();

}


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    document
        .getElementById("navMenu")
        .classList.toggle("active");

}


/* ================= INITIAL LOAD ================= */

displayProducts();

updateCart();