// DEMO-ONLY login gate. Both credentials and data ship to the browser.
// This is NOT secure authentication or an authorization boundary.
export const DEMO_ADMIN_USERNAME = 'merchant';
export const DEMO_ADMIN_PASSWORD = 'NexusDemo2026!';
export const DEMO_SESSION_KEY = 'nx_demo_admin_session_v1';

export function pageFromPath(pathname) {
  return /^\/admin\/?$/.test(pathname) ? 'admin' : 'store';
}

export function validDemoCredentials(username, password) {
  return typeof username === 'string' && username.trim() === DEMO_ADMIN_USERNAME && typeof password === 'string' && password.trim() === DEMO_ADMIN_PASSWORD;
}

export function readDemoSession(storage) {
  try { return storage?.getItem(DEMO_SESSION_KEY) === 'signed-in'; }
  catch { return false; }
}

export function saveDemoSession(storage, signedIn) {
  try {
    if (!storage) return false;
    if (signedIn) storage.setItem(DEMO_SESSION_KEY, 'signed-in');
    else storage.removeItem(DEMO_SESSION_KEY);
    return true;
  } catch { return false; }
}
