// Datos de productos
const products = [
    {
        id: 1,
        name: "Raqueta PowerAce 98",
        subtitle: "Raqueta profesional",
        price: 299.99,
        image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
        category: "raquetas",
        brand: "Strivo",
        gender: "unisex"
    },
    {
        id: 2,
        name: "Zapatillas Court Pro",
        subtitle: "Zapatillas para hombre",
        price: 159.99,
        image: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
        category: "calzado",
        brand: "Strivo",
        gender: "hombre"
    },
    {
        id: 3,
        name: "Set de Pelotas Premium",
        subtitle: "Pack de 3 pelotas",
        price: 24.99,
        image: "https://images.pexels.com/photos/616484/pexels-photo-616484.jpeg",
        category: "accesorios",
        brand: "Strivo",
        gender: "unisex"
    },
    {
        id: 4,
        name: "Zapatillas FlexWoman",
        subtitle: "Zapatillas para mujer",
        price: 149.99,
        image: "https://images.pexels.com/photos/2346237/pexels-photo-2346237.jpeg",
        category: "calzado",
        brand: "Strivo",
        gender: "mujer"
    },
    {
        id: 5,
        name: "Raqueta Junior",
        subtitle: "Raqueta para niños",
        price: 89.99,
        image: "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg",
        category: "raquetas",
        brand: "Strivo",
        gender: "niños"
    },
    {
        id: 6,
        name: "Camiseta Deportiva Hombre",
        subtitle: "Camiseta transpirable",
        price: 39.99,
        image: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
        category: "ropa",
        brand: "Strivo",
        gender: "hombre"
    },
    {
        id: 7,
        name: "Shorts Deportivos Mujer",
        subtitle: "Shorts elásticos",
        price: 29.99,
        image: "https://images.pexels.com/photos/2346237/pexels-photo-2346237.jpeg",
        category: "ropa",
        brand: "Strivo",
        gender: "mujer"
    },
    {
        id: 8,
        name: "Kit Entrenamiento Niños",
        subtitle: "Set completo infantil",
        price: 69.99,
        image: "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg",
        category: "accesorios",
        brand: "Strivo",
        gender: "niños"
    },
    {
        id: 9,
        name: "Raqueta Pro Elite",
        subtitle: "Raqueta profesional avanzada",
        price: 459.99,
        image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
        category: "raquetas",
        brand: "Wilson",
        gender: "unisex"
    },
    {
        id: 10,
        name: "Zapatillas Speed Court",
        subtitle: "Máximo rendimiento",
        price: 199.99,
        image: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
        category: "calzado",
        brand: "Nike",
        gender: "hombre"
    },
    {
        id: 11,
        name: "Vestido Deportivo Elegante",
        subtitle: "Vestido para competición",
        price: 89.99,
        image: "https://images.pexels.com/photos/2346237/pexels-photo-2346237.jpeg",
        category: "ropa",
        brand: "Adidas",
        gender: "mujer"
    },
    {
        id: 12,
        name: "Raqueta Beginner Kids",
        subtitle: "Primera raqueta",
        price: 49.99,
        image: "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg",
        category: "raquetas",
        brand: "Head",
        gender: "niños"
    }
];

// Estado de la aplicación
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateFavoritesCount();
    
    // Cargar productos si estamos en la página principal
    if (document.getElementById('productsGrid')) {
        loadFeaturedProducts();
    }
    
    // Cargar contenido específico según la página
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'carrito.html':
            loadCartPage();
            break;
        case 'favoritos.html':
            loadFavoritesPage();
            break;
        case 'hombres.html':
            loadCategoryProducts('hombre');
            break;
        case 'mujeres.html':
            loadCategoryProducts('mujer');
            break;
        case 'ninos.html':
            loadCategoryProducts('niños');
            break;
        case 'marcas.html':
            loadBrandsPage();
            break;
        case 'descuento.html':
            loadDiscountPage();
            break;
        default:
            if (document.getElementById('productsGrid')) {
                loadFeaturedProducts();
            }
    }
});

// Funciones de utilidad
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems > 0 ? totalItems : '';
    }
}

function updateFavoritesCount() {
    const favoritesCount = document.getElementById('favoritesCount');
    if (favoritesCount) {
        favoritesCount.textContent = favorites.length > 0 ? favorites.length : '';
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

// Funciones de productos
function createProductCard(product, showDiscount = false) {
    const isFavorite = favorites.some(fav => fav.id === product.id);
    const discountPrice = showDiscount ? (product.price * 0.8).toFixed(2) : null;
    
    return `
        <div class="product-card">
            <button class="favorite-heart ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
                ♥
            </button>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-subtitle">${product.subtitle}</p>
                <div class="product-price">
                    ${showDiscount ? `
                        <span style="text-decoration: line-through; color: #999;">$${product.price}</span>
                        <span style="color: #ff6b6b; font-weight: bold;">$${discountPrice}</span>
                    ` : `$${product.price}`}
                </div>
                <div class="product-actions">
                    <button class="btn add-to-cart" onclick="addToCart(${product.id})">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    `;
}

function loadFeaturedProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const featuredProducts = products.slice(0, 8);
    productsGrid.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function loadCategoryProducts(gender) {
    const productsGrid = document.getElementById('categoryProducts');
    if (!productsGrid) return;
    
    const categoryProducts = products.filter(product => 
        product.gender === gender || product.gender === 'unisex'
    );
    
    productsGrid.innerHTML = categoryProducts.map(product => createProductCard(product)).join('');
}

function loadBrandsPage() {
    const brandsProducts = document.getElementById('brandsProducts');
    if (!brandsProducts) return;
    
    brandsProducts.innerHTML = products.map(product => createProductCard(product)).join('');
}

function loadDiscountPage() {
    const discountProducts = document.getElementById('discountProducts');
    if (!discountProducts) return;
    
    discountProducts.innerHTML = products.map(product => createProductCard(product, true)).join('');
}

// Funciones del carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    
    // Mostrar notificación
    showNotification('Producto agregado al carrito');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    loadCartPage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        loadCartPage();
    }
}

function loadCartPage() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega algunos productos para comenzar</p>
                <a href="index.html" class="explore-btn">Explorar productos</a>
            </div>
        `;
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.subtitle}</p>
            </div>
            <div class="item-price">$${item.price}</div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');
    
    // Actualizar resumen
    if (cartSummary) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 100 ? 0 : 15;
        const total = subtotal + shipping;
        
        cartSummary.innerHTML = `
            <h3>Resumen del pedido</h3>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Envío:</span>
                <span>${shipping === 0 ? 'Gratis' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row total-row">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="checkout()">Proceder al pago</button>
        `;
    }
}

// Funciones de favoritos
function toggleFavorite(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingIndex = favorites.findIndex(fav => fav.id === productId);
    
    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
        showNotification('Producto eliminado de favoritos');
    } else {
        favorites.push(product);
        showNotification('Producto agregado a favoritos');
    }
    
    saveFavorites();
    
    // Actualizar el botón de favorito
    const heartBtn = document.querySelector(`button[onclick="toggleFavorite(${productId})"]`);
    if (heartBtn) {
        heartBtn.classList.toggle('active');
    }
    
    // Recargar la página de favoritos si estamos en ella
    if (window.location.pathname.includes('favoritos.html')) {
        loadFavoritesPage();
    }
}

function loadFavoritesPage() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    if (!favoritesGrid) return;
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = `
            <div class="empty-state">
                <h2>No tienes favoritos</h2>
                <p>Guarda productos que te gusten para verlos aquí</p>
                <a href="index.html" class="explore-btn">Explorar productos</a>
            </div>
        `;
        return;
    }
    
    favoritesGrid.innerHTML = favorites.map(product => createProductCard(product)).join('');
}

// Funciones de búsqueda
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) return;
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
    );
    
    // Guardar resultados de búsqueda y redirigir
    localStorage.setItem('searchResults', JSON.stringify(filteredProducts));
    localStorage.setItem('searchQuery', query);
    window.location.href = 'busqueda.html';
}

// Manejar búsqueda con Enter
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.id === 'searchInput') {
        searchProducts();
    }
});

// Funciones de navegación
function goHome() {
    window.location.href = 'index.html';
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    // Simular proceso de pago
    showNotification('Redirigiendo al pago...');
    setTimeout(() => {
        alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
        cart = [];
        saveCart();
        loadCartPage();
    }, 2000);
}

// Sistema de notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Filtros para páginas de categoría
function filterProducts(category, filter) {
    // Esta función se puede expandir para filtrar productos por diferentes criterios
    console.log(`Filtering ${category} by ${filter}`);
}