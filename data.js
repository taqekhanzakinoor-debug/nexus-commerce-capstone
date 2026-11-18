// All products, names, orders, and inquiries are fictional demo data.
export const PRODUCTS = [
  { id: 'aurora-lamp', name: 'Aurora Desk Lamp', category: 'Home', price: 4200, stock: 12, image: '/images/aurora-lamp.svg', badge: 'Bestseller', description: 'A warm, minimal desk lamp for late-night reading, studying, and comfortable workspaces.' },
  { id: 'terra-bottle', name: 'Terra Water Bottle', category: 'Lifestyle', price: 1850, stock: 18, image: '/images/terra-bottle.svg', badge: 'New arrival', description: 'A reusable everyday bottle with a durable finish and a compact, carry-friendly profile.' },
  { id: 'studio-headphones', name: 'Studio Headphones', category: 'Tech', price: 8900, stock: 6, image: '/images/studio-headphones.svg', badge: 'Popular', description: 'Comfortable over-ear headphones designed for immersive listening and focused work.' },
  { id: 'orbit-notebook', name: 'Orbit Notebook Set', category: 'Stationery', price: 1250, stock: 25, image: '/images/orbit-notebook.svg', badge: '', description: 'Two beautifully simple notebooks for study plans, ideas, sketches, and daily notes.' },
  { id: 'arc-backpack', name: 'Arc Everyday Backpack', category: 'Lifestyle', price: 6800, stock: 9, image: '/images/arc-backpack.svg', badge: '', description: 'A streamlined daily carry with room for a laptop, accessories, and essentials.' },
  { id: 'brew-mug', name: 'Brew Ceramic Mug', category: 'Home', price: 1650, stock: 0, image: '/images/brew-mug.svg', badge: 'Sold out', description: 'A matte ceramic mug with a generous handle and a warm, modern feel.' },
  { id: 'nova-speaker', name: 'Nova Mini Speaker', category: 'Tech', price: 5700, stock: 7, image: '/images/nova-speaker.svg', badge: '', description: 'A compact wireless speaker for music, podcasts, and easy listening at home.' },
  { id: 'botanic-planter', name: 'Botanic Table Planter', category: 'Home', price: 2350, stock: 10, image: '/images/botanic-planter.svg', badge: 'Gift idea', description: 'A small modern planter to bring a little greenery to your desk or living room.' }
];

export const DEMO_ORDERS = [
  { id: 'NX-DEMO01', date: '2026-11-16T10:00:00.000Z', customer: { name: 'Ayesha Demo', email: 'ayesha@example.test', address: 'Demo Address 1, Islamabad' }, items: [{ productId: 'terra-bottle', name: 'Terra Water Bottle', price: 1850, quantity: 2 }], total: 3700, status: 'Processing' },
  { id: 'NX-DEMO02', date: '2026-11-17T10:00:00.000Z', customer: { name: 'Bilal Demo', email: 'bilal@example.test', address: 'Demo Address 2, Wah' }, items: [{ productId: 'orbit-notebook', name: 'Orbit Notebook Set', price: 1250, quantity: 1 }], total: 1250, status: 'Delivered' }
];

export const DEMO_INQUIRIES = [
  { id: 'INQ-101', name: 'Sara Demo', email: 'sara@example.test', subject: 'Delivery question', message: 'Do you deliver to Wah Cantt?', status: 'Open', notes: '' },
  { id: 'INQ-102', name: 'Hamza Demo', email: 'hamza@example.test', subject: 'Product availability', message: 'When will the Brew Mug be back?', status: 'Pending', notes: 'Check stock before replying.' },
  { id: 'INQ-103', name: 'Zara Demo', email: 'zara@example.test', subject: 'Order update', message: 'Thank you for the order update.', status: 'Resolved', notes: 'Demo inquiry only.' }
];

export const money = amount => `Rs. ${Number(amount).toLocaleString('en-PK')}`;
