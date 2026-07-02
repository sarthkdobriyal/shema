# Shema Demo Ecommerce Site — Design

## Purpose

A learning project for a first-time Angular user: a simple, static (no backend) traditional
ecommerce storefront called "Shema" with ~10 dummy products split across Men/Women categories.
Visual reference: user-provided homepage screenshots (yellow/black themed, hero banner, featured
categories, footer with Help/Contact/Stay Connected columns).

## Stack

- **Angular** (latest CLI, standalone components, TypeScript)
- **Tailwind CSS** for styling
- **Angular Router** for navigation
- No backend — all data is local (bundled JSON/TS array), no login/payment
- Run via `ng serve`, tested manually in Chrome

## Pages

1. **Home** (`/`)
   - Header: logo, search bar, account/wishlist/cart icons, nav (Home/Men/Women)
   - Hero banner section ("Checkout The Best Fashion Style", Shop Now CTA)
   - Featured Categories section (Men card, Women card, each with Shop Now)
   - Footer (Help links, Contact Us, Stay Connected social icons, copyright bar)
   - Built first, matched against the two screenshots already provided.

2. **Product Listing** (`/men`, `/women`)
   - Grid of product cards (image, name, price) filtered by category
   - Screenshot to be provided when this page is built.

3. **Product Detail** (`/product/:id`)
   - Single product image, name, price, description, size selector, Add to Cart button
   - Screenshot to be provided when this page is built.

4. **Cart** (`/cart`)
   - List of items added (image, name, price, qty, remove), running total
   - Screenshot to be provided when this page is built.

Shared header + footer wrap all pages via a layout component.

## Data

- `products.ts` (or `products.json`) bundled in the app: ~10 dummy products, mixed men/women,
  each with `id, name, price, category ('men'|'women'), imageUrl, description, sizes[]`.
- Images: stock/placeholder image URLs (not locally stored), similar in style to the ones in the
  screenshots.

## State

- `CartService` (injectable, Angular signal-based): holds cart items (`productId, qty`) in memory.
- Cart is persisted to **localStorage** on every change, and rehydrated on app startup, so it
  survives page refreshes.
- No other global state needed (no auth, no checkout flow).

## Out of scope

- Login/authentication (icons present in header but non-functional/decorative)
- Checkout/payment flow
- Wishlist functionality (icon present, non-functional)
- Backend/API integration
- Automated tests (manual Chrome testing only, per user's request)

## Build order

1. Scaffold Angular project + Tailwind, verify `ng serve` runs in Chrome
2. Home page (match provided screenshots)
3. Product Listing page (screenshot provided at that time)
4. Product Detail page (screenshot provided at that time)
5. Cart page + CartService with localStorage (screenshot provided at that time)

Each step: build, then guide user through terminal commands to run and manually verify in Chrome
before moving to the next page.
