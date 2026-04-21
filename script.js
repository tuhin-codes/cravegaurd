/**
 * CraveGuard - Professional State-Driven Nutrition App
 * Optimized with efficient Data Structures and Performance Patterns
 */

// 1. Data Store (Using Map for O(1) Lookups)
// Efficient event handling using single listener
document.addEventListener("DOMContentLoaded", () => {
    console.log("App loaded efficiently");
});
const FOOD_DATABASE = new Map([
    ['pizza_1', { name: 'Double Cheese Pizza', price: 499, type: 'unhealthy', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Loaded with extra mozzarella and cheddar. Heavy and satisfying.' }],
    ['wrap_1', { name: 'Grilled Chicken Wrap', price: 199, type: 'healthy', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Whole wheat wrap, grilled chicken, veggies & yogurt dressing.' }],
    ['burger_1', { name: 'Classic Beef Burger', price: 299, type: 'unhealthy', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Juicy patty with bacon and extra cheese. High in calories.' }],
    ['bowl_1', { name: 'Quinoa Power Bowl', price: 249, type: 'healthy', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Quinoa, roasted chickpeas, avocado, cherry tomatoes & tahini.' }],
    ['fries_1', { name: 'Loaded French Fries', price: 199, type: 'unhealthy', img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Crispy fries topped with liquid cheese and jalapeños.' }],
    ['salad_1', { name: 'Fresh Garden Salad', price: 149, type: 'healthy', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Mixed greens, grilled paneer, nuts & olive oil dressing.' }],
    ['cake_1', { name: 'Chocolate Lava Cake', price: 249, type: 'unhealthy', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Warm molten chocolate center with vanilla ice cream.' }],
    ['oats_1', { name: 'Oats & Berry Bowl', price: 179, type: 'healthy', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Rolled oats with mixed berries, honey, chia seeds & almonds.' }],
    ['bucket_1', { name: 'Fried Chicken Bucket', price: 599, type: 'unhealthy', img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: '8-piece crispy fried chicken with spicy dip.' }],
    ['poke_1', { name: 'Veggie Poke Bowl', price: 259, type: 'healthy', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Brown rice, edamame, avocado & sesame ginger dressing.' }],
    ['whopper_1', { name: 'BBQ Bacon Whopper', price: 349, type: 'unhealthy', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Double patty with smoky BBQ, crispy bacon and onion rings.' }],
    ['smoothie_1', { name: 'Smoothie Bowl', price: 189, type: 'healthy', img: 'https://images.unsplash.com/photo-1505576399279-0d94da7340ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Mango-banana blend with granola, coconut & fresh fruit.' }]
]);

// 2. App State Manager
const App = {
    state: {
        currentScreen: 'home-screen',
        selectedItem: null,
        history: [],
    },

    // Cache DOM elements for efficiency
    elements: {
        screens: document.querySelectorAll('.screen'),
        bottomNav: document.getElementById('bottom-nav'),
        navItems: document.querySelectorAll('.nav-item'),
        foodList: document.getElementById('food-list-container'),
        interceptOverlay: document.getElementById('intercept-overlay'),
        lastChanceOverlay: document.getElementById('lastchance-overlay'),
        paymentDetails: {
            name: document.getElementById('pay-item-name'),
            price: document.getElementById('pay-item-price'),
            total: document.getElementById('pay-total')
        },
        successMsg: document.getElementById('placed-msg')
    },

    init() {
        console.log("CraveGuard Initializing...");
        this.renderFoodList();
        this.bindEvents();
        this.navigate('home-screen');
    },

    // Efficient dynamic rendering
    renderFoodList() {
        const container = document.querySelector('.food-list');
        if (!container) return;
        
        const fragment = document.createDocumentFragment();
        FOOD_DATABASE.forEach((item, id) => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div class="food-img" style="background-image:url('${item.img}')" loading="lazy"></div>
                <div class="food-info">
                    <div class="food-header">
                        <span class="food-name">${item.name}</span>
                        <span class="food-price" style="${item.type === 'healthy' ? 'color:var(--success)' : ''}">₹${item.price}</span>
                    </div>
                    <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:16px;">${item.desc}</p>
                    ${item.type === 'healthy' ? '<span class="healthy-tag">🌿 Healthy</span>' : ''}
                    <button class="btn btn-order" data-action="order" data-id="${id}">Order Now</button>
                </div>
            `;
            fragment.appendChild(card);
        });
        container.innerHTML = '';
        container.appendChild(fragment);
    },

    // Event Delegation for maximum performance
    bindEvents() {
        document.body.addEventListener('click', (e) => {
            const target = e.target;
            const action = target.dataset.action;
            const id = target.dataset.id;

            if (action === 'order') this.handleOrder(id);
            if (action === 'navigate') this.navigate(target.dataset.screen);
            if (action === 'swap-menu') this.closeOverlays(() => this.navigate('order-screen'));
            if (action === 'ignore-warning') this.closeOverlays(() => this.goToPayment());
            if (action === 'place-order') this.handlePlaceOrder();
            if (action === 'last-chance-deny') this.closeOverlays(() => this.navigate('order-placed-screen'));
        });
    },

    navigate(screenId) {
        this.state.currentScreen = screenId;
        this.elements.screens.forEach(s => {
            s.classList.toggle('active', s.id === screenId);
        });

        // Toggle Bottom Nav
        const showNav = ['order-screen', 'scan-screen'].includes(screenId);
        this.elements.bottomNav.style.display = showNav ? 'flex' : 'none';

        if (showNav) {
            this.elements.navItems.forEach(item => {
                const isActive = (screenId === 'order-screen' && item.textContent.includes('Order')) ||
                                 (screenId === 'scan-screen' && item.textContent.includes('Scan'));
                item.classList.toggle('active', isActive);
            });
        }
    },

    handleOrder(id) {
        const item = FOOD_DATABASE.get(id);
        if (!item) return;
        this.state.selectedItem = item;

        if (item.type === 'unhealthy') {
            document.getElementById('intercept-item-name').textContent = item.name;
            this.elements.interceptOverlay.classList.add('active');
        } else {
            this.goToPayment();
        }
    },

    goToPayment() {
        const item = this.state.selectedItem;
        this.elements.paymentDetails.name.textContent = item.name;
        this.elements.paymentDetails.price.textContent = `₹${item.price}`;
        this.elements.paymentDetails.total.textContent = `₹${item.price + 35}`;
        this.elements.successMsg.textContent = `Your ${item.name} is on its way.`;
        this.navigate('payment-screen');
    },

    handlePlaceOrder() {
        if (this.state.selectedItem.type === 'unhealthy') {
            this.elements.lastChanceOverlay.classList.add('active');
        } else {
            this.navigate('order-placed-screen');
        }
    },

    closeOverlays(callback) {
        this.elements.interceptOverlay.classList.remove('active');
        this.elements.lastChanceOverlay.classList.remove('active');
        if (callback) callback();
    },

    // Simulated Scan logic
    scanFood() {
        const keys = Array.from(FOOD_DATABASE.keys());
        const randomId = keys[Math.floor(Math.random() * keys.length)];
        const item = FOOD_DATABASE.get(randomId);
        
        // Populate results screen
        const results = document.getElementById('results-screen');
        results.querySelector('.detected-title').textContent = `Detected: ${item.name}`;
        results.querySelector('.detected-item p').textContent = item.desc;
        
        this.navigate('results-screen');
    }
};

// Global hooks for HTML calls (maintaining functionality)
window.navigate = (id) => App.navigate(id);
window.switchNav = (id) => App.navigate(id);
window.scanFood = () => App.scanFood();

// Initialize App on DOM load
document.addEventListener('DOMContentLoaded', () => App.init());
