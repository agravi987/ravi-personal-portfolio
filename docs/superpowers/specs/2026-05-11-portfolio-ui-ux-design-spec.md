---
name: portfolio-ui-ux-design-spec
description: Design specification for responsive UI, project‑card, navigation, performance and contact‑form improvements.
type: reference
---

# Design Specification – Portfolio UI/UX (2026‑05‑11)

## Goals
- Make the site clean, user‑friendly, and fully responsive on mobile.
- Highlight projects effectively for recruiters.
- Speed up initial page load and perceived performance.
- Provide an accessible, easy‑to‑use contact form.

## Global Layout
- Wrap the root `<body>` content in a container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Ensure `html,body` have `min-h-screen` and `overflow-x-hidden`.
- Use Tailwind breakpoints (`sm`, `md`, `lg`, `xl`) for progressive enhancement.

## Navigation (Navbar)
- Add a hamburger button visible on `md:hidden` that toggles a slide‑down mobile menu.
- Mobile menu uses `fixed inset-0 bg-black/50` overlay and `transform transition-transform` to slide from `-translate-y-full` → `translate-y-0`.
- ARIA attributes: `aria-expanded`, `aria-controls`, appropriate `role="navigation"`.
- Focus trap: on open set focus to first link; close on `Escape`.
- Desktop menu stays inline (`flex space-x-4`).

## Hero Section
- Switch grid to `flex-col-reverse md:flex-row`.
- Hide large orbit graphics on screens `<md` (`hidden md:block`).
- Keep background images but use `object-cover` with `opacity-65` for light mode and `opacity-55` for dark.

## Projects Page
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for smoother tablet layout.
- Project cards:
  - Enforce `aspect-w-16 aspect-h-9` on image container for consistent ratios.
  - Use Next.js `<Image loading="lazy">` for all non‑hero images.
  - Add Tailwind hover/focus states: `transform hover:-translate-y-1 transition` and `focus-visible:ring-2 focus-visible:ring-cyan-500`.
  - Add CSS‑only skeleton (`bg-gray-200 dark:bg-gray-700 animate-pulse`) while images load.
  - Provide `role="button"` and `aria-label` with project title.
- Category filter buttons already exist – ensure they use `sm:` padding for larger tap targets.

## Loading Performance
- Keep `priority` only on the hero background image; all others lazy.
- Add CSS skeleton placeholders for project images.
- Dynamically import heavy components (`GitHubProjectsExplorer`, `ProjectCaseStudyModal`) with `next/dynamic` and `ssr: false`.
- Parallel data fetching in `getPortfolioData` via `Promise.all` if profile and projects are separate APIs.
- Optional lightweight toast component for async feedback.

## Contact Form
- Add HTML5 validation attributes (`required`, `type="email"`, `minLength`, etc.).
- Tailwind focus outlines: `focus-visible:ring-2 focus-visible:ring-cyan-500`.
- Inline error messages styled with `text-sm text-red-600`.
- Success/Error toast that appears top‑right (`fixed top-4 right-4`).
- Honeypot hidden field (`name="bot-field"`) for spam protection.
- Ensure each input has associated `<label>` and `aria-describedby` for error spans.

## Theming & Dark Mode
- All new classes include matching `dark:` variants (e.g., `bg-gray-200 dark:bg-gray-700`).
- No new color palette – reuse existing cyan / slate shades.

## Accessibility Checklist
- Keyboard‑navigable hamburger menu and modal.
- Sufficient color contrast for text and UI elements.
- `alt` text on all images (already present).
- Focus-visible outlines on interactive elements.

---

**Implementation Note**: The above changes only require Tailwind utilities and a few small helper components. No major UI library is added, keeping the bundle size low and avoiding breaking the existing app.
