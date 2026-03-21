

## Problem
After a founder submits the alignment form, the next section is the expert form — which feels inappropriate and breaks the user journey.

## Solution
Move the Expert Form to its own dedicated route (`/experts`) and update all links accordingly.

### Changes

1. **Create `src/pages/Experts.tsx`**
   - A standalone page with the Navbar, a brief intro, the `ExpertForm` component, and the Footer.

2. **Update `src/pages/Index.tsx`**
   - Remove the `ExpertForm` import and component from the landing page.

3. **Update `src/App.tsx`**
   - Add route: `/experts` → `Experts` page.

4. **Update `src/components/Navbar.tsx`**
   - Change the "Experts" nav link to point to `/experts` instead of `#experts`.

5. **Update `src/components/Hero.tsx`**
   - Change the "Join as an Early Expert" CTA button to link to `/experts` using a router `Link` or anchor.

6. **Update any other components** (Footer, ExpertNetwork, etc.) that link to `#expert-form` — redirect them to `/experts`.

This keeps the founder journey clean on the main page and gives experts a dedicated, distraction-free entry point.

