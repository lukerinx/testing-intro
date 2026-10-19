function addToCart(cart, product, quantity) {
  if (quantity <= 0) throw new RangeError('Количество должно быть больше нуля');
  if (quantity > product.stock) throw new RangeError('Недостаточно товара на складе');

  const newCart = [...cart];
  const itemIndex = newCart.findIndex((item) => item.id === product.id);

  if (itemIndex !== -1) {
    const newQuantity = newCart[itemIndex].quantity + quantity;
    if (newQuantity > product.stock) throw new RangeError('Недостаточно товара на складе');
    newCart[itemIndex] = {
      ...newCart[itemIndex],
      quantity: newQuantity,
    };
  } else {
    newCart.push({
      ...product,
      quantity: quantity,
    });
  }
  return newCart;
}

function changeQuantity(cart, productId, newQuantity) {
  if (newQuantity <= 0) throw new RangeError('Количество должно быть больше нуля');

  return cart.map((item) => {
    if (item.id === productId) {
      if (newQuantity > item.stock) throw new RangeError('Недостаточно товара на складе');
      return {
        ...item,
        quantity: newQuantity,
      };
    }
    return item;
  });
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;
  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.floor(subtotal * 0.1);
  }

  let delivery = 0;
  if (subtotal > 0 && subtotal < 50000) {
    delivery = 30000;
  }

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    addToCart,
    changeQuantity,
    removeFromCart,
    calculateCartSubtotal,
    calculateOrderTotal,
  };
}