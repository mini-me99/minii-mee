const products = [
    {
        id: 1,
        name: 'Cute T-Shirt',
        price: 19.99,
        images: ["C:\Users\11\Desktop\2\images\IMG-20250312-WA0048.jpg", 'product1-2.jpg']
    },
    {
        id: 2,
        name: 'Stylish Pants',
        price: 24.99,
        images: ['product2-1.jpg', 'product2-2.jpg']
    },
    {
        id: 3,
        name: 'Adorable Dress',
        price: 29.99,
        images: ['product3-1.jpg', 'product3-2.jpg']
    },
    {
        id: 4,
        name: 'Cozy Jacket',
        price: 34.99,
        images: ['product4-1.jpg', 'product4-2.jpg']
    },
    // Add more products as needed
];

function displayProducts() {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product">
                <img src="images/${product.images[0]}" alt="${product.name}" width="300" onclick="showLightbox(${product.id})">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <input type="number" id="quantity${product.id}" value="1" min="1" max="10">
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, 'images/${product.images[0]}')">Add to Cart</button>
            </div>
        `;
    });
}

// Call displayProducts() when the shop page loads
if (window.location.pathname.endsWith('shop.html')) {
    document.addEventListener('DOMContentLoaded', displayProducts);
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, name, price, image) {
    let quantity = parseInt(document.getElementById('quantity' + productId).value);
    cart.push({ productId, name, price, quantity, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(quantity + " " + name + "(s) added to cart!");
}

function displayCart() {
    let cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartContent.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="max-width: 100px;">
                <p>${item.name} (${item.quantity}) - ${itemTotal.toFixed(2)}</p>
            </div>
        `;
    });
    cartContent.innerHTML += `<p>Total: ${total.toFixed(2)}</p>`;
}

function displayOrderDetails() {
    let orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        orderDetails.innerHTML = '<p>No items in cart.</p>';
        return;
    }
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        orderDetails.innerHTML += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" width="300">
                <p>${item.name} (${item.quantity}) - ${itemTotal.toFixed(2)}</p>
                <input type="hidden" name="items[]" value="${item.name} (${item.quantity}) - ${itemTotal.toFixed(2)}">
                <input type="hidden" name="images[]" value="${item.image}">
            </div>
        `;
    });
    orderDetails.innerHTML += `<p>Total: ${total.toFixed(2)}</p><input type="hidden" name="total" value="${total.toFixed(2)}">`;
}

if (window.location.pathname.endsWith('cart.html')) {
    displayCart();
}

if (window.location.pathname.endsWith('checkout.html')) {
    displayOrderDetails();
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showLightbox(productId) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    lightboxContent.innerHTML = ''; // Clear previous images
    const product = products.find(p => p.id === productId);

    if (product && product.images) {
        product.images.forEach(image => {
            lightboxContent.innerHTML += `<img src="images/${image}" alt="${product.name}" class="lightbox-image">`;
        });
        lightbox.style.display = 'flex';
    }
}

function hideLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Add lightbox structure to the end of the body.
document.body.innerHTML += `
    <div id="lightbox" class="lightbox" onclick="hideLightbox()">
        <div id="lightbox-content" class="lightbox-content"></div>
    </div>
`;
