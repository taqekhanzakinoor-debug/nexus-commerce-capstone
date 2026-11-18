import { useEffect, useMemo, useState } from 'react';
import { DEMO_INQUIRIES, DEMO_ORDERS, PRODUCTS, money } from './data';
import { usePersistentState } from './usePersistentState';
import { stockFor, cartLines, subtotalFor, addCartProduct, changeCartQuantity, checkoutError, createDemoOrder, decreaseStock } from './storeLogic';
import { pageFromPath, readDemoSession, saveDemoSession, validDemoCredentials } from './authDemo';

const CATEGORIES = ['All', 'Home', 'Lifestyle', 'Tech', 'Stationery'];
const ORDER_STATUSES = ['New', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const INQUIRY_STATUSES = ['Open', 'Pending', 'Resolved'];
const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Icon({ name, size = 20 }) {
  const shape = {
    cart: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.1 12.5a2 2 0 0 0 2 1.7h10.3a2 2 0 0 0 2-1.6L23 6H6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
    arrow: <><path d="M4 12h16m-7-7 7 7-7 7"/></>,
    box: <><path d="m3 7 9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4m-9 4v10"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    close: <><path d="M18 6 6 18M6 6l12 12"/></>,
    minus: <path d="M5 12h14"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    check: <path d="M20 6 9 17l-5-5"/>,
    bag: <><path d="M4 8h16l-1.5 13h-13zM9 9V6a3 3 0 0 1 6 0v3"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
    spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8zM20 18l.8 2.2L23 21l-2.2.8L20 24l-.8-2.2L17 21l2.2-.8z"/></>,
    chart: <><path d="M3 3v18h18M7 16l4-5 3 2 6-7"/></>,
    shield: <><path d="m12 22 8-4V6l-8-4-8 4v12z"/><path d="m9 12 2 2 4-4"/></>,
    lock: <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></>,
  }[name];
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shape}</svg>;
}

function Logo() {
  return <span className="logo-mark" aria-label="NEXUS Commerce"><span className="logo-icon"><span/><span/><span/><span/></span><span className="logo-word">nexus<span className="logo-dot">.</span></span><span className="logo-suffix">commerce</span></span>;
}

function ProductCard({ product, inStock, onView, onAdd }) {
  return <article className="product-card">
    <button className="product-image" onClick={() => onView(product)} aria-label={`View ${product.name}`}>
      <img src={product.image} alt={product.name} />
      {product.badge && <span className={`product-badge ${!inStock ? 'sold-out-badge' : ''}`}>{product.badge}</span>}
      <span className="quick-view">View details <Icon name="arrow" size={15}/></span>
    </button>
    <div className="product-meta"><span>{product.category}</span><span>{inStock ? `${inStock} available` : 'Unavailable'}</span></div>
    <div className="product-bottom"><div><button className="product-name" onClick={() => onView(product)}>{product.name}</button><strong>{money(product.price)}</strong></div><button className="add-circle" disabled={!inStock} onClick={() => onAdd(product.id)} aria-label={`Add ${product.name} to cart`} title={inStock ? 'Add to cart' : 'Out of stock'}><Icon name="plus" size={18}/></button></div>
  </article>;
}

function Pill({ children, tone = 'default' }) { return <span className={`status-pill status-${String(tone).toLowerCase().replace(/\s/g, '-')}`}>{children}</span>; }

function ContactSection({ onSubmit, inquiryForm, setInquiryForm }) {
  return <section className="contact-section" id="contact"><div className="contact-intro"><div className="eyebrow light">NEED A HAND?</div><h2>Questions? We're<br/>here to help.</h2><p>Send a fictional inquiry to test our contact form.</p><span className="demo-note">Demo only · No real support service</span></div>
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="two-fields"><label>Your demo name<input aria-label="Inquiry name" placeholder="e.g. Alex Demo" value={inquiryForm.name} onChange={e => setInquiryForm(v => ({...v, name:e.target.value}))} required /></label><label>Demo email<input type="email" aria-label="Inquiry email" placeholder="alex@example.test" value={inquiryForm.email} onChange={e => setInquiryForm(v => ({...v, email:e.target.value}))} required /></label></div>
      <label>How can we help?<textarea aria-label="Inquiry message" placeholder="Ask something about a demo product..." value={inquiryForm.message} onChange={e => setInquiryForm(v => ({...v, message:e.target.value}))} rows="3" required /></label>
      <button className="button button-lime" type="submit">Send demo inquiry <Icon name="arrow" size={18}/></button>
    </form></section>;
}

function Overlay({ title, onClose, children, wide = false }) {
  return <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><section className={`drawer ${wide ? 'drawer-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}><div className="drawer-top"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close"/></button></div>{children}</section></div>;
}

function AdminLogin({ onLogin, error, onEdit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  return <main className="admin-login-page container">
    <section className="admin-login-card" aria-labelledby="admin-login-title">
      <div className="admin-login-icon"><Icon name="lock" size={27}/></div>
      <div className="eyebrow">MERCHANT WORKSPACE · DEMO</div>
      <h1 id="admin-login-title">Merchant <em>sign in.</em></h1>
      <p className="admin-login-lead">This dashboard is separate from the customer storefront. Enter the demo account details to continue.</p>
      <form className="admin-login-form" onSubmit={event => onLogin(event, { username, password })}>
        <label htmlFor="demo-admin-username">Username</label>
        <input id="demo-admin-username" autoComplete="username" value={username} onChange={event=>{setUsername(event.target.value);onEdit();}} placeholder="Merchant username" required />
        <label htmlFor="demo-admin-password">Password</label>
        <div className="password-field"><input id="demo-admin-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={event=>{setPassword(event.target.value);onEdit();}} placeholder="Demo password" required /><button type="button" onClick={()=>setShowPassword(value=>!value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <button className="button button-dark full" type="submit">Sign in to CRM <Icon name="arrow" size={18}/></button>
      </form>
      <p className="admin-login-warning"><Icon name="shield" size={17}/> Educational login only. It does not secure browser data. Use the fictional credentials documented in README.md; never enter a real password.</p>
    </section>
  </main>;
}

function Admin({ orders, inquiries, updateOrder, updateInquiry, onReset }) {
  const [tab, setTab] = useState('orders');
  const [search, setSearch] = useState('');
  const total = orders.reduce((acc, order) => acc + (order.status === 'Cancelled' ? 0 : order.total), 0);
  const openCount = inquiries.filter(item => item.status !== 'Resolved').length;
  const filteredOrders = orders.filter(order => [order.id, order.customer.name, order.customer.email].some(item => item.toLowerCase().includes(search.toLowerCase())));
  const filteredInquiries = inquiries.filter(inquiry => [inquiry.id, inquiry.name, inquiry.subject].some(item => item.toLowerCase().includes(search.toLowerCase())));
  return <main className="admin-page container">
    <div className="page-intro"><div><div className="eyebrow">MERCHANT WORKSPACE / DEMO</div><h1>Your store, <em>at a glance.</em></h1><p>Manage fictional customer inquiries and orders placed through this browser.</p></div><button className="reset-button" onClick={onReset}>Reset demo data</button></div>
    <div className="stat-grid"><div className="stat-card"><div className="stat-top"><span>Total orders</span><Icon name="bag"/></div><strong>{orders.length}</strong><small>Including demo orders</small></div><div className="stat-card"><div className="stat-top"><span>Non-cancelled order value</span><Icon name="chart"/></div><strong>{money(total)}</strong><small>Demo value, not real revenue</small></div><div className="stat-card"><div className="stat-top"><span>Active inquiries</span><Icon name="users"/></div><strong>{openCount}</strong><small>Open and pending inquiries</small></div></div>
    <section className="admin-panel"><div className="admin-panel-head"><div className="admin-tabs"><button className={tab==='orders'?'active':''} onClick={() => {setTab('orders');setSearch('');}}>Orders <span>{orders.length}</span></button><button className={tab==='inquiries'?'active':''} onClick={() => {setTab('inquiries');setSearch('');}}>Customer inquiries <span>{inquiries.length}</span></button></div><div className="admin-search"><Icon name="search" size={17}/><input placeholder={`Search ${tab}...`} aria-label={`Search ${tab}`} value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      {tab === 'orders' ? (filteredOrders.length ? <div className="table-wrap"><table><thead><tr><th>Order / placed</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>{filteredOrders.map(order => <tr key={order.id}><td><strong>{order.id}</strong><small>{new Date(order.date).toLocaleDateString('en-PK', {year:'numeric',month:'short',day:'numeric'})}</small></td><td>{order.customer.name}<small>{order.customer.email}</small></td><td>{order.items.map(item => `${item.quantity} × ${item.name}`).join(', ')}</td><td className="table-total">{money(order.total)}</td><td><label className="sr-only" htmlFor={`status-${order.id}`}>Status for {order.id}</label><select id={`status-${order.id}`} value={order.status} onChange={e=>updateOrder(order.id,e.target.value)}>{ORDER_STATUSES.map(v=><option key={v}>{v}</option>)}</select></td></tr>)}</tbody></table></div> : <div className="empty-state">No orders found for your search.</div>) : (filteredInquiries.length ? <div className="inquiry-list">{filteredInquiries.map(item=><div className="inquiry-item" key={item.id}><div><div className="inquiry-name">{item.name} <Pill tone={item.status}>{item.status}</Pill></div><small>{item.id} · {item.email}</small><h3>{item.subject}</h3><p>{item.message}</p></div><div className="inquiry-controls"><label>Status<select aria-label={`Status of ${item.id}`} value={item.status} onChange={e=>updateInquiry(item.id,{status:e.target.value})}>{INQUIRY_STATUSES.map(v=><option key={v}>{v}</option>)}</select></label><label>Internal notes<textarea aria-label={`Notes for ${item.id}`} rows="2" value={item.notes} onChange={e=>updateInquiry(item.id,{notes:e.target.value})} placeholder="Add a demo note..."/></label></div></div>)}</div> : <div className="empty-state">No inquiries found for your search.</div>)}
    </section><div className="admin-disclaimer"><Icon name="shield" size={18}/> This demo login is client-side only, not real authentication. Orders and inquiries remain in local browser storage and are not safe for real customers.</div>
  </main>;
}

export default function App() {
  const [page, setPage] = useState(() => pageFromPath(window.location.pathname));
  const [adminLoggedIn, setAdminLoggedIn] = useState(() => readDemoSession(window.sessionStorage));
  const [adminLoginError, setAdminLoginError] = useState('');
  const [cart, setCart] = usePersistentState('nx_cart_v1', []);
  const [orders, setOrders] = usePersistentState('nx_orders_v1', DEMO_ORDERS);
  const [inquiries, setInquiries] = usePersistentState('nx_inquiries_v1', DEMO_INQUIRIES);
  const [inventory, setInventory] = usePersistentState('nx_inventory_v1', Object.fromEntries(PRODUCTS.map(p=>[p.id,p.stock])));
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [toast, setToast] = useState('');
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    function handlePopState() {
      setPage(pageFromPath(window.location.pathname));
      setDrawer(null);
      setSelected(null);
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function signIn(event, { username, password }) {
    event.preventDefault();
    if (!validDemoCredentials(username, password)) {
      setAdminLoginError('Incorrect demo username or password. See the README for demo credentials.');
      return;
    }
    if (!saveDemoSession(window.sessionStorage, true)) {
      setAdminLoginError('Browser session storage is unavailable; the demo cannot keep you signed in.');
      return;
    }
    setAdminLoginError('');
    setAdminLoggedIn(true);
    notify('Signed in to the demo merchant workspace.');
  }
  function signOut() {
    saveDemoSession(window.sessionStorage, false);
    setAdminLoggedIn(false);
    setAdminLoginError('');
    navigate('admin');
    notify('Signed out of the merchant demo.');
  }

  const notify = message => { setToast(message); };
  const available = id => stockFor(inventory, id);
  const products = useMemo(() => PRODUCTS.filter(p => (category === 'All' || p.category === category) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query.trim().toLowerCase())), [category, query]);
  const cartItems = cartLines(cart, PRODUCTS);
  const subtotal = subtotalFor(cartItems);
  const cartCount = cartItems.reduce((sum,row)=>sum+row.quantity,0);

  function addToCart(id) {
    const result = addCartProduct(cart, id, inventory, PRODUCTS);
    if (result.error) { notify(result.error); return; }
    setCart(result.cart);
    notify(`${PRODUCTS.find(item => item.id === id).name} added to cart.`);
  }
  function setQuantity(id, quantity) {
    setCart(prev => changeCartQuantity(prev, id, quantity, inventory));
  }
  function checkout(event) {
    event.preventDefault();
    const error = checkoutError(customer, cartItems, inventory);
    if (error) { setFormError(error); return; }
    const id = `NX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const newOrder = createDemoOrder(customer, cartItems, { id, date: new Date().toISOString() });
    setOrders(prev => [newOrder, ...prev]);
    setInventory(prev => decreaseStock(prev, cartItems));
    setCart([]);
    setCustomer({ name: '', email: '', address: '' });
    setFormError('');
    setReceipt(newOrder);
    setDrawer('confirmation');
  }
  function addInquiry(event) {
    event.preventDefault();
    if (inquiryForm.name.trim().length < 2 || !MAIL_RE.test(inquiryForm.email.trim()) || inquiryForm.message.trim().length < 10) { notify('Enter a demo name, valid email and a message of at least 10 characters.'); return; }
    const row = {id:`INQ-${Date.now().toString(36).toUpperCase()}`,name:inquiryForm.name.trim(),email:inquiryForm.email.trim(),subject:'Website inquiry',message:inquiryForm.message.trim(),status:'Open',notes:''};
    setInquiries(prev=>[row,...prev]); setInquiryForm({name:'',email:'',message:''}); notify('Demo inquiry sent successfully.');
  }
  function resetDemo() {
    if (!window.confirm('Reset cart, orders, inventory and inquiries to fictional demo data?')) return;
    setCart([]); setOrders(DEMO_ORDERS); setInquiries(DEMO_INQUIRIES); setInventory(Object.fromEntries(PRODUCTS.map(p=>[p.id,p.stock]))); setReceipt(null); notify('Demo data restored.');
  }
  function navigate(destination) {
    const path = destination === 'admin' ? '/admin' : '/';
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    setPage(destination); setDrawer(null); setSelected(null); window.scrollTo({top:0,behavior:'smooth'});
  }

  return <><div className="announcement">Built for exploration, not real transactions <span>✦</span> Free simulated checkout</div><header className="site-header"><div className="container header-content"><button className="brand-button" onClick={()=>navigate('store')} aria-label="Go to storefront"><Logo/></button><nav className="main-nav" aria-label="Main navigation"><button className={page==='store'?'nav-active':''} onClick={()=>navigate('store')}>Storefront</button>{adminLoggedIn && page==='admin' && <button className="nav-active" onClick={()=>navigate('admin')}>Dashboard</button>}</nav><div className="header-actions">{page==='admin' && adminLoggedIn ? <button className="admin-logout" onClick={signOut}><Icon name="logout" size={16}/> Sign out</button> : page==='store' ? <button className="cart-button" aria-label={`Open cart with ${cartCount} items`} onClick={()=>setDrawer('cart')}><Icon name="bag" size={21}/><span>{cartCount}</span></button> : null}</div></div></header>
  {page==='store' ? <main><section className="hero"><div className="container hero-grid"><div className="hero-content"><div className="eyebrow"><span className="eyebrow-line"/> CURATED FOR YOUR EVERYDAY</div><h1>Good things.<br/><em>Better days.</em></h1><p>Thoughtful everyday essentials for work, life and everything in between. Discover your next favorite thing.</p><button className="button button-dark" onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}>Explore collection <Icon name="arrow" size={18}/></button><div className="hero-sub"><span className="hero-stars">✦ ✦ ✦</span> A concept store, built for the capstone</div></div><div className="hero-visual"><div className="hero-orbit orbit-a"/><div className="hero-orbit orbit-b"/><div className="hero-image-wrap"><img src="/images/aurora-lamp.svg" alt="Featured Aurora Desk Lamp illustration"/></div><div className="float-card float-card-top"><span>✺</span> Everyday design</div><div className="float-card float-card-bottom"><span>01 / 08</span><strong>Aurora Desk Lamp</strong></div><div className="hero-corner-text">DESIGNED FOR LIVING · 2026</div></div></div></section>
  <div className="feature-strip"><div className="container"><span><Icon name="box" size={21}/> Curated essentials</span><span><Icon name="check" size={21}/> Interactive product demo</span><span><Icon name="shield" size={21}/> No real payments</span></div></div>
  <section className="catalog-section container" id="products"><div className="section-top"><div><div className="eyebrow">THE NEXUS EDIT / VOL. 01</div><h2>Discover your <em>favorites.</em></h2><p>Small upgrades. Everyday inspiration.</p></div><div className="count-indicator">{products.length.toString().padStart(2,'0')} PRODUCTS</div></div><div className="catalog-tools"><div className="categories" role="group" aria-label="Product category">{CATEGORIES.map(cat=><button key={cat} className={category===cat?'selected':''} onClick={()=>setCategory(cat)}>{cat}</button>)}</div><label className="search-box"><Icon name="search" size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products" aria-label="Search products"/></label></div>
  {products.length ? <div className="product-grid">{products.map(product=><ProductCard key={product.id} product={product} inStock={available(product.id)} onView={setSelected} onAdd={addToCart}/>)}</div> : <div className="empty-products"><span>⌕</span><h3>No products found</h3><p>Try a different search or category.</p><button onClick={()=>{setCategory('All');setQuery('');}} className="button button-dark">Clear filters</button></div>}</section>
  <section className="statement-section"><div className="container statement-inner"><div className="statement-mark">✳</div><h2>Made to discover.<br/><em>Built to connect.</em></h2><p>From discovery to simulated checkout, every demo order is recorded for store operators in a separate workspace.</p><button className="button button-outline" onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}>Explore the collection <Icon name="arrow" size={18}/></button></div></section>
  <div className="container"><ContactSection onSubmit={addInquiry} inquiryForm={inquiryForm} setInquiryForm={setInquiryForm}/></div></main> : adminLoggedIn ? <Admin orders={orders} inquiries={inquiries} updateOrder={(id,status)=>{setOrders(prev=>prev.map(row=>row.id===id?{...row,status}:row));notify('Order status updated.');}} updateInquiry={(id,patch)=>setInquiries(prev=>prev.map(row=>row.id===id?{...row,...patch}:row))} onReset={resetDemo}/> : <AdminLogin onLogin={signIn} error={adminLoginError} onEdit={()=>setAdminLoginError('')}/>}
  <footer className="footer"><div className="container footer-content"><Logo/><p>© 2026 NEXUS Commerce · Student demo prototype<br/>Fictional products & customers · Browser-only persistence</p></div></footer>
  {selected && <Overlay title="Product details" onClose={()=>setSelected(null)} wide><div className="detail-layout"><div className="detail-image"><img src={selected.image} alt={selected.name}/></div><div className="detail-info"><div className="eyebrow">{selected.category} / NEXUS EDIT</div><h2>{selected.name}</h2><strong className="detail-price">{money(selected.price)}</strong><p>{selected.description}</p><div className="detail-availability">{available(selected.id) ? <><span className="availability-dot"/> {available(selected.id)} in stock</> : 'Currently sold out'}</div><button className="button button-dark full" onClick={()=>{addToCart(selected.id); if(available(selected.id))setSelected(null);}} disabled={!available(selected.id)}>Add to cart <Icon name="plus" size={18}/></button><small>Demo product · No real purchasing</small></div></div></Overlay>}
  {drawer === 'cart' && <Overlay title={`Your cart (${cartCount})`} onClose={()=>setDrawer(null)}><div className="drawer-scroll">{cartItems.length ? cartItems.map(({product,quantity})=><div className="cart-item" key={product.id}><img src={product.image} alt=""/><div className="cart-item-copy"><h3>{product.name}</h3><small>{money(product.price)}</small><div className="quantity-control"><button onClick={()=>setQuantity(product.id,quantity-1)} aria-label={`Decrease ${product.name}`}><Icon name="minus" size={15}/></button><span>{quantity}</span><button disabled={quantity>=available(product.id)} onClick={()=>setQuantity(product.id,quantity+1)} aria-label={`Increase ${product.name}`}><Icon name="plus" size={15}/></button></div></div><button className="remove-link" onClick={()=>setQuantity(product.id,0)} aria-label={`Remove ${product.name}`}>Remove</button></div>) : <div className="empty-cart"><Icon name="bag" size={43}/><h3>Your cart is empty</h3><p>Find something you love in our collection.</p><button className="button button-dark" onClick={()=>setDrawer(null)}>Browse products <Icon name="arrow" size={17}/></button></div>}</div>{cartItems.length>0 && <div className="drawer-bottom"><div className="cart-subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><small>Free demo checkout · No payment collected</small><button className="button button-dark full" onClick={()=>{setFormError('');setDrawer('checkout');}}>Continue to checkout <Icon name="arrow" size={18}/></button></div>}</Overlay>}
  {drawer === 'checkout' && <Overlay title="Simulated checkout" onClose={()=>setDrawer(null)}><form className="checkout-form" onSubmit={checkout} noValidate><div className="checkout-intro"><Icon name="shield" size={22}/></div><label>Demo customer name<input placeholder="Alex Demo" value={customer.name} onChange={e=>setCustomer(v=>({...v,name:e.target.value}))} required/></label><label>Demo email<input placeholder="alex@example.test" type="email" value={customer.email} onChange={e=>setCustomer(v=>({...v,email:e.target.value}))} required/></label><label>Demo delivery address<textarea placeholder="123 Example Street, Demo City" rows="3" value={customer.address} onChange={e=>setCustomer(v=>({...v,address:e.target.value}))} required/></label>{formError && <div className="form-error" role="alert">{formError}</div>}<div className="checkout-total"><span>Demo total</span><strong>{money(subtotal)}</strong></div><button type="submit" className="button button-dark full">Place demo order <Icon name="arrow" size={18}/></button><button className="checkout-back" type="button" onClick={()=>setDrawer('cart')}>← Back to cart</button></form></Overlay>}
  {drawer === 'confirmation' && receipt && <Overlay title="Order confirmed" onClose={()=>setDrawer(null)}>
    <div className="confirmation-panel">
      <div className="confirmation-icon"><Icon name="check" size={30}/></div>
      <div className="eyebrow">DEMO ORDER SUCCESSFUL</div>
      <h2>Thank you for trying Nexus.</h2>
      <p>Your simulated order has been saved. No payment or real delivery has occurred.</p>
      <div className="confirmation-reference"><span>Order number</span><strong>{receipt.id}</strong></div>
      <div className="confirmation-reference"><span>Customer</span><strong>{receipt.customer.name}</strong></div>
      <div className="confirmation-lines">{receipt.items.map(item=><div key={item.productId}><span>{item.quantity} × {item.name}</span><strong>{money(item.quantity * item.price)}</strong></div>)}</div>
      <div className="confirmation-total"><span>Demo total</span><strong>{money(receipt.total)}</strong></div>
      <button className="button button-dark full" onClick={()=>{setDrawer(null);setReceipt(null);navigate('store');}}>Continue shopping <Icon name="arrow" size={18}/></button>
      <button className="checkout-back" onClick={()=>{setDrawer(null);setReceipt(null);}}>Continue browsing storefront</button>
    </div>
  </Overlay>}
  {toast && <div className="toast" role="status"><Icon name="check" size={17}/><span>{toast}</span><button onClick={()=>setToast('')} aria-label="Dismiss notification"><Icon name="close" size={17}/></button></div>}
  </>;
}
