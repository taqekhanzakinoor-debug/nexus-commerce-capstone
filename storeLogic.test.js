import test from 'node:test';
import assert from 'node:assert/strict';
import {
  stockFor, cartLines, subtotalFor, addCartProduct, changeCartQuantity,
  checkoutError, createDemoOrder, decreaseStock
} from './storeLogic.js';
import { PRODUCTS } from './data.js';

const inventory = Object.fromEntries(PRODUCTS.map(product => [product.id, product.stock]));
const demoCustomer = { name: 'Alex Demo', email: 'alex@example.test', address: '123 Demo Street, Wah' };

const id = 'terra-bottle';

test('demo stock reflects available and sold-out products', () => {
  assert.equal(stockFor(inventory, id), 18);
  assert.equal(stockFor(inventory, 'brew-mug'), 0);
  assert.equal(stockFor(inventory, 'not-a-product'), 0);
  assert.equal(stockFor({ [id]: 'invalid' }, id), 0);
});

test('adding item to cart and adding second quantity', () => {
  const first = addCartProduct([], id, inventory, PRODUCTS);
  assert.equal(first.error, null);
  assert.deepEqual(first.cart, [{ productId: id, quantity: 1 }]);
  const second = addCartProduct(first.cart, id, inventory, PRODUCTS);
  assert.deepEqual(second.cart, [{ productId: id, quantity: 2 }]);
});

test('sold-out product and unknown product cannot be added', () => {
  assert.match(addCartProduct([], 'brew-mug', inventory, PRODUCTS).error, /unavailable/);
  assert.match(addCartProduct([], 'missing', inventory, PRODUCTS).error, /unavailable/);
});

test('cart quantity cannot exceed stock or go below zero', () => {
  const cart = [{ productId: id, quantity: 1 }];
  assert.equal(changeCartQuantity(cart, id, 999, inventory)[0].quantity, 18);
  assert.deepEqual(changeCartQuantity(cart, id, -2, inventory), []);
  assert.deepEqual(changeCartQuantity(cart, id, 0, inventory), []);
});

test('cart rejects corrupted lines and unknown products', () => {
  const lines = cartLines([{ productId: 'missing', quantity: 1 }, { productId: id, quantity: -5 }, { productId: id, quantity: 2 }], PRODUCTS);
  assert.equal(lines.length, 1);
  assert.equal(lines[0].quantity, 2);
});

test('subtotal equals unit price multiplied by quantity', () => {
  const lines = cartLines([{ productId: id, quantity: 2 }, { productId: 'orbit-notebook', quantity: 1 }], PRODUCTS);
  assert.equal(subtotalFor(lines), 4950);
});

test('empty cart returns checkout validation error', () => {
  assert.match(checkoutError(demoCustomer, [], inventory), /empty/);
});

test('missing name, invalid email, and short address fail checkout', () => {
  const lines = cartLines([{ productId: id, quantity: 1 }], PRODUCTS);
  for (const changed of [
    { ...demoCustomer, name: 'A' },
    { ...demoCustomer, email: 'invalid-email' },
    { ...demoCustomer, address: '123' }
  ]) assert.match(checkoutError(changed, lines, inventory), /valid email/);
});

test('overselling stock is blocked at checkout', () => {
  const lines = cartLines([{ productId: id, quantity: 19 }], PRODUCTS);
  assert.match(checkoutError(demoCustomer, lines, inventory), /stock/);
});

test('valid checkout creates an order with correct references and total', () => {
  const lines = cartLines([{ productId: id, quantity: 2 }], PRODUCTS);
  assert.equal(checkoutError(demoCustomer, lines, inventory), null);
  const order = createDemoOrder(demoCustomer, lines, { id: 'NX-TEST001', date: '2026-11-18T10:00:00.000Z' });
  assert.equal(order.id, 'NX-TEST001');
  assert.equal(order.status, 'New');
  assert.equal(order.customer.email, demoCustomer.email);
  assert.equal(order.total, 3700);
  assert.deepEqual(order.items.map(item => [item.productId, item.quantity]), [[id, 2]]);
});

test('placing order decrements only purchased stock', () => {
  const lines = cartLines([{ productId: id, quantity: 2 }], PRODUCTS);
  const result = decreaseStock(inventory, lines);
  assert.equal(result[id], 16);
  assert.equal(result['orbit-notebook'], inventory['orbit-notebook']);
  assert.equal(inventory[id], 18, 'original inventory stays unchanged');
});

test('order status fields can be independently updated without changing totals', () => {
  const lines = cartLines([{ productId: id, quantity: 1 }], PRODUCTS);
  const orders = [createDemoOrder(demoCustomer, lines, { id: 'NX-TEST002', date: '2026-11-18T11:00:00.000Z' })];
  const updated = orders.map(order => order.id === 'NX-TEST002' ? { ...order, status: 'Processing' } : order);
  assert.equal(updated[0].status, 'Processing');
  assert.equal(updated[0].total, 1850);
  assert.equal(orders[0].status, 'New');
});
