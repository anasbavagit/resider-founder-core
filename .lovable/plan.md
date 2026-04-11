

## Fix Hash Navigation for #founder-form

**Problem:** The "Founders" nav link (`/#founder-form`) doesn't scroll to the form when navigating from other pages. The browser navigates to `/` but doesn't process the hash scroll because the component hasn't rendered yet.

**Solution:** Add a `ScrollToHash` component inside `BrowserRouter` that listens for hash changes via `useLocation` and scrolls to the target element after a short delay (to allow rendering).

### Changes

**1. Create `src/components/ScrollToHash.tsx`**
A small component using `useLocation` from React Router. On every location change, if `location.hash` exists, wait ~100ms for render, then `document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })`. Also scroll to top when navigating to pages without a hash.

**2. Update `src/App.tsx`**
Add `<ScrollToHash />` inside `<BrowserRouter>` just above `<Routes>`.

**3. Update `src/components/Navbar.tsx`**
Convert `<a href="...">` tags to React Router `<Link>` (or use `useNavigate`) so navigation stays client-side. For `/#founder-form`, use `Link to="/#founder-form"` or handle it with `navigate('/', { hash: '#founder-form' })`. This ensures React Router processes the navigation rather than a full page reload.

No database changes needed.

