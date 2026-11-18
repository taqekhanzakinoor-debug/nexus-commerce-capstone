// Pure functions shared by the storefront and the Node.js test suite.
// This student demo uses only fictional information and never charges a card.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function stockFor(inventory, id) {
  const value = Number(inventory?.[id]);
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

export function cartLines(cart, products) {
  if (!Array.isArray(cart)) return [];
  return cart.flatMap(row => {
    const product = products.find(item => item.id === row?.productId);
    const quantity = Number(row?.quantity);
    return product && Number.isInteger(quantity) && quantity > 0
      ? [{ product, quantity }] : [];
  });
}

export function subtotalFor(lines) {
  return lines.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
}

export function addCartProduct(cart, id, inventory, products) {
  const product = products.find(item => item.id === id);
  if (!product || stockFor(inventory, id) === 0) return { cart, error: 'This product is unavailable.' };
  const existing = cart.find(row => row.productId === id)?.quantity ?? 0;
  if (existing >= stockFor(inventory, id)) return { cart, error: 'Only the available quantity can be added.' };
  return { cart: existing
    ? cart.map(row => row.productId === id ? { ...row, quantity: row.quantity + 1 } : row)
    : [...cart, { productId: id, quantity: 1 }], error: null };
}

export function changeCartQuantity(cart, id, quantity, inventory) {
  const proposed = Number(quantity);
  const next = Number.isFinite(proposed) ? Math.max(0, Math.min(stockFor(inventory, id), Math.floor(proposed))) : 0;
  return cart.map(row => row.productId === id ? { ...row, quantity: next } : row).filter(row => row.quantity > 0);
}

export function checkoutError(customer, lines, inventory) {
  if (!lines.length) return 'Your cart is empty.';
  if (!customer || customer.name?.trim().length < 2 || !EMAIL_PATTERN.test(customer.email?.trim() ?? '') || customer.address?.trim().length < 8 || !customer.name || !customer.address) {
    return 'Enter a demo name, valid email and address (at least 8 characters).';
  }
  if (lines.some(({ product, quantity }) => quantity > stockFor(inventory, product.id))) {
    return 'One or more items exceed current available stock. Update your cart first.';
  }
  return null;
}

export function createDemoOrder(customer, lines, { id, date }) {
  return {
    id,
    date,
    customer: { name: customer.name.trim(), email: customer.email.trim(), address: customer.address.trim() },
    items: lines.map(({ product, quantity }) => ({ productId: product.id, name: product.name, price: product.price, quantity })),
    total: subtotalFor(lines),
    status: 'New'
  };
}

export function decreaseStock(inventory, lines) {
  const updates = { ...inventory };
  for (const { product, quantity } of lines) {
    updates[product.id] = Math.max(0, stockFor(updates, product.id) - quantity);
  }
  return updates;
}
