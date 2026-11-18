import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const required = [
  'index.html', 'package.json', 'vite.config.js', 'src/main.jsx',
  'src/App.jsx', 'src/data.js', 'src/storeLogic.js', 'src/authDemo.js', 'src/styles.css', 'src/usePersistentState.js',
  '.gitignore', '.env.example', 'README.md', 'prompts/INDEX.md',
  'docs/architecture.md', 'docs/context-engineering.md', 'docs/testing.md', 'docs/deployment.md', 'tests/storeLogic.test.js', 'tests/authDemo.test.js', 'prompts/02-checkout-verification.md', 'prompts/03-merchant-login.md'
];
for (const file of required) {
  if (!existsSync(join(root, file))) throw new Error(`Missing required project file: ${file}`);
}
const app = readFileSync(join(root, 'src/App.jsx'), 'utf8');
const data = readFileSync(join(root, 'src/data.js'), 'utf8');
for (const feature of ['checkout(', 'addInquiry(', 'setQuantity(', 'updateOrder', 'updateInquiry', 'usePersistentState', 'Search products', 'AdminLogin', 'signOut()', 'pageFromPath', 'Order confirmed', 'confirmation-panel']) {
  if (!app.includes(feature)) throw new Error(`Missing feature marker: ${feature}`);
}
if (app.includes('View order in CRM') || app.includes('>Merchant CRM</button>') || app.includes('>Merchant dashboard</button>')) {
  throw new Error('Customer-facing navigation still exposes the CRM');
}
const matches = [...data.matchAll(/image: '([^']+)'/g)];
if (matches.length < 8) throw new Error('Expected at least 8 demo product images');
for (const [, image] of matches) {
  if (!existsSync(join(root, 'public', image))) throw new Error(`Missing image: ${image}`);
}
console.log(`PASS: ${required.length} project files and ${matches.length} image paths present.`);
console.log('NOTE: This is a static check, not a React build or browser end-to-end test.');
