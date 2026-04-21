let currentItem = { name: '', price: '', type: '' };

function navigate(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    const bottomNav = document.getElementById('bottom-nav');
    if (screenId === 'order-screen' || screenId === 'scan-screen') {
        bottomNav.style.display = 'flex';
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        if (screenId === 'order-screen') bottomNav.children[0].classList.add('active');
        if (screenId === 'scan-screen') bottomNav.children[1].classList.add('active');
    } else {
        bottomNav.style.display = 'none';
    }
}

function switchNav(screenId) { navigate(screenId); }

function orderItem(name, price, type) {
    currentItem = { name, price, type };
    if (type === 'unhealthy') {
        document.getElementById('intercept-item-name').textContent = name;
        document.getElementById('intercept-overlay').classList.add('active');
    } else {
        goToPayment();
    }
}

function swapToMenu() {
    document.getElementById('intercept-overlay').classList.remove('active');
    navigate('order-screen');
}

function ignoreWarning() {
    document.getElementById('intercept-overlay').classList.remove('active');
    goToPayment();
}

function goToPayment() {
    document.getElementById('pay-item-name').textContent = currentItem.name;
    document.getElementById('pay-item-price').textContent = '₹' + currentItem.price;
    document.getElementById('pay-total').textContent = '₹' + (parseInt(currentItem.price) + 35);
    document.getElementById('placed-msg').textContent = 'Your ' + currentItem.name + ' is on its way.';
    navigate('payment-screen');
}

function placeOrder() {
    if (currentItem.type === 'unhealthy') {
        document.getElementById('lastchance-overlay').classList.add('active');
    } else {
        navigate('order-placed-screen');
    }
}

function lastChanceSwap() {
    document.getElementById('lastchance-overlay').classList.remove('active');
    navigate('order-screen');
}

function lastChanceDeny() {
    document.getElementById('lastchance-overlay').classList.remove('active');
    navigate('order-placed-screen');
}