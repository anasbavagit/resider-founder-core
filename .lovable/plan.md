## Elevate Resider Beyond a Landing Page

Inspired by Consultport's multi-page structure — expert profiles, expertise categories, client testimonials, case studies, and process explanations — here is a plan to make Resider feel like a full platform, not just a single landing page.

---

### Current State

- **/** — Landing page (Hero, Problem, Solution, Execution Layers, How It Works, Who This Is For, Differentiation, FAQ, Founder Form)
- **/experts** — Expert landing page (ExpertNetwork intro, ExpertStandards, ExpertForm)
- **/experts/signup** — Standalone expert signup with UAE Pass placeholder

Navigation: How It Works → Founders → Experts → FAQ

---

### New Pages and Features

**1. About Page (`/about`)**
A dedicated page explaining Resider's mission, philosophy, and why it exists. Sections: mission statement, the team/founder story, "Why UAE", and the precision-led allocation model explained in depth. This builds trust and gives the platform institutional weight.

**2. Expertise Areas Page (`/expertise`)**
A browsable grid of execution layer categories (Structuring, Licensing, Compliance, Operations, Banking, Early Execution) — each as a card with an icon, short description, and what founders can expect. Similar to Consultport's "Discover Our Consultant's Expertise" section but as a standalone page. Each category could eventually link to a detail page.

**3. How It Works Page (`/how-it-works`)**
Expand the current 4-step section into a full dedicated page with richer detail: the founder journey (step-by-step with visuals), the expert allocation process, what happens after alignment, and timeline expectations. Adds a prominent CTA at the bottom.

&nbsp;

**5. Expert Showcase Preview**
On the `/experts` page, add a "Meet Our Experts" section showing anonymized or category-based expert profile cards (e.g., "Banking Specialist · 12 years · Previously at Big Four"). No real names needed yet — this demonstrates network depth. Similar to Consultport's "Meet Our Consultants" carousel.

---

### Navigation Updates

**Updated Navbar:**
How It Works → Expertise → Founders → Experts → About

**Updated Footer:** Add links to all new pages plus existing Problem/Solution anchors.

---

### Technical Details


| Change            | Files                                                                      |
| ----------------- | -------------------------------------------------------------------------- |
| About page        | New `src/pages/About.tsx` with mission, philosophy, and "Why UAE" sections |
| Expertise page    | New `src/pages/Expertise.tsx` with execution layer category cards          |
| How It Works page | New `src/pages/HowItWorksPage.tsx` (full page version)                     |
| &nbsp;            | &nbsp;                                                                     |
| Expert showcase   | New `src/components/ExpertShowcase.tsx` added to Experts page              |
| Navbar update     | Update `navLinks` array in `src/components/Navbar.tsx`                     |
| Footer update     | Add new page links in `src/components/Footer.tsx`                          |
| Router update     | Add new routes in `src/App.tsx`                                            |


No database changes required — all new pages are static content pages. The expert showcase will use hardcoded anonymized placeholder data for now.