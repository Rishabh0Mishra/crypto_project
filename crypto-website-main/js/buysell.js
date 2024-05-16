var cartItems = [];
var finalValue = 0;

function addToCart(crypto, price) {
    cartItems.push({ crypto: crypto, price: price });
    updateCart();
}

function updateCart() {
    var cart = document.getElementById('cart');
    cart.innerHTML = '';
    cartItems.forEach(item => {
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.crypto}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cart.appendChild(cartItem);
    });
}

function showTotalBill() {
    var finalValueElement = document.getElementById('finalValue');
    if (finalValueElement.style.display === 'none') {
        finalValue = cartItems.reduce((total, item) => total + item.price, 0);
        finalValueElement.textContent = "Final Value: $" + finalValue.toFixed(2);
        finalValueElement.style.display = 'block';
    } else {
        finalValueElement.style.display = 'none';
    }
}