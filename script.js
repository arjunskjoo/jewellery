// Sample product data
const products = [
    {
        id: 1,
        name: "Diamond Engagement Ring",
        category: "rings",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Exquisite diamond engagement ring with platinum band"
    },
    {
        id: 2,
        name: "Sapphire Necklace",
        category: "necklaces",
        price: 899.99,
        image: "https://jahan.ch/wp-content/uploads/2020/07/Important-Blue-Sapphire-Necklace-3023432-OVL-i-Cropped1.jpg",
        description: "Beautiful blue sapphire pendant on a silver chain"
    },
    {
        id: 3,
        name: "Pearl Earrings",
        category: "earrings",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Elegant freshwater pearl drop earrings"
    },
    {
        id: 4,
        name: "Gold Bracelet",
        category: "bracelets",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "18K gold chain bracelet with intricate details"
    },
    {
        id: 5,
        name: "Emerald Ring",
        category: "rings",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Vibrant emerald set in rose gold ring"
    },
    {
        id: 6,
        name: "Ruby Pendant",
        category: "necklaces",
        price: 799.99,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ad5e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Stunning ruby pendant on a delicate gold chain"
    },
    {
        id: 7,
        name: "Diamond Stud Earrings",
        category: "earrings",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1617038220319-27650e93e2e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Classic diamond stud earrings in white gold"
    },
    {
        id: 8,
        name: "Tennis Bracelet",
        category: "bracelets",
        price: 1899.99,
        image: "https://images.unsplash.com/photo-1626209619929-95a8c3c12746?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Elegant diamond tennis bracelet"
    }
];

// Shopping cart
let cart = [];
let cartCount = 0;

// DOM Elements
const productGrid = document.getElementById('product-grid');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.querySelector('.cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartCountElement = document.querySelector('.cart-count');
const closeModal = document.querySelector('.close');
const testimonialDots = document.querySelectorAll('.dot');

// Initialize the application
function init() {
    // Load all products initially
    displayProducts('all');
    
    // Add event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Display products for selected category
            displayProducts(button.getAttribute('data-category'));
        });
    });
    
    // Cart functionality
    document.querySelector('a[href="#cart"]').addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });
    
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Testimonial slider
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = dot.getAttribute('data-index');
            showTestimonial(index);
        });
    });
    
    // Form submissions
    document.getElementById('message-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    });
    
    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        e.target.reset();
    });
    
    // Auto rotate testimonials
    setInterval(() => {
        rotateTestimonials();
    }, 5000);
}

// Display products based on category
function displayProducts(category) {
    // Clear the product grid
    productGrid.innerHTML = '';
    
    // Filter products if not "all"
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    // Display each product
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>{product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="{product.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(button.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        // Update cart count
        cartCount += 1;
        cartCountElement.textContent = cartCount;
        
        // Show confirmation
        showNotification(`${product.name} added to cart!`);
    }
}

// Open cart modal
function openCart() {
    // Clear cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
    } else {
        // Add each item to cart
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Qty: ${item.quantity}</p>
                    </div>
                </div>
                <div class="cart-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <div class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
    }
    
    // Update total
    updateCartTotal();
    
    // Show modal
    cartModal.style.display = 'block';
}

// Remove item from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        // Update cart count
        cartCount -= cart[itemIndex].quantity;
        cartCountElement.textContent = cartCount;
        
        // Remove item from cart
        cart.splice(itemIndex, 1);
        
        // Refresh cart
        openCart();
    }
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = total.toFixed(2);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #d4af37;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Testimonial functions
function showTestimonial(index) {
    // Hide all testimonials
    document.querySelectorAll('.testimonial').forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Show selected testimonial
    document.querySelectorAll('.testimonial')[index].classList.add('active');
    
    // Update dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    testimonialDots[index].classList.add('active');
}

function rotateTestimonials() {
    const currentIndex = Array.from(testimonialDots).findIndex(dot => dot.classList.contains('active'));
    const nextIndex = (currentIndex + 1) % testimonialDots.length;
    showTestimonial(nextIndex);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);