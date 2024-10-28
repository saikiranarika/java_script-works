let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.getElementById('cartButton');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartCount = document.getElementById('cartCount');

  // Add to Cart button functionality
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productElement = e.target.closest('.product');
      const productName = productElement.getAttribute('data-name');
      const productPrice = parseFloat(productElement.getAttribute('data-price'));

      addToCart(productName, productPrice);
      updateCartCount();
      displayCartItems();
    });
  });

  // Show/Hide cart items on clicking the cart button
  cartButton.addEventListener('click', () => {
    cartItemsContainer.style.display = cartItemsContainer.style.display === 'none' ? 'block' : 'none';
  });

  function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
  }

  function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity -= 1;
      if (cart[itemIndex].quantity === 0) {
        cart.splice(itemIndex, 1);
      }
    }
    updateCartCount();
    displayCartItems();
  }

  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  function displayCartItems() {
    const cartItemsList = cart.map(item => 
      `<li>
        ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
        <button class="remove-from-cart" data-name="${item.name}">Remove</button>
      </li>`
    ).join('');
    
    cartItemsContainer.innerHTML = `
      <ul>
        ${cartItemsList ? cartItemsList : '<li>No items in cart</li>'}
      </ul>`;

    // Add event listeners to all "Remove" buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const itemName = e.target.getAttribute('data-name');
        removeFromCart(itemName);
      });
    });
  }
});
