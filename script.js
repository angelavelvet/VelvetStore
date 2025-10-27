let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCart();

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        const id = product.dataset.id;
        const price = parseFloat(product.dataset.price);
        const name = product.querySelector('h3').textContent;
        
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    });
});

document.getElementById('checkout').addEventListener('click', () => {
    alert('Compra simulada completada. ¡Gracias!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
});

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    });
    total.textContent = totalPrice;
    
    document.getElementById('cart').style.display = cart.length ? 'block' : 'none';
}
