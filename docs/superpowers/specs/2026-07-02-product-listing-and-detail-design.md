# Product Listing + Product Detail Pages — Design

## Purpose

Add two pages to the Shema demo ecommerce site, matching the user-provided screenshots: a
Product Listing page (shown per-category at `/men` and `/women`) and a Product Detail page
(`/product/:id`). Builds directly on the Home page work already completed
(`docs/superpowers/specs/2026-07-02-shema-ecom-design.md`).

## Screenshot deviations (resolved with user)

The reference screenshots don't perfectly match this project's existing scope/data, so the
following deviations were discussed and agreed:

- **Products:** keep the existing 5 men's + 5 women's dummy products in `products.ts` rather than
  replacing them with the different product set shown in the screenshots. The Listing page will
  show 5 products per category, not 10.
- **Price format:** always show a `$` prefix (e.g. `$29.99`), everywhere — the screenshots
  inconsistently showed plain numbers on the Listing page but `$`-prefixed numbers on the Detail
  page; we standardize on `$` throughout.
- **Highlights:** the screenshot's "Highlights" bullets were generic placeholder text unrelated to
  the pictured product. We instead write 2-3 real, relevant highlight bullets per product.
- **Listing controls:** the "Show: All" / "Filter by: Latest" dropdowns and "SHOW MORE" button are
  rendered for visual match but are non-functional (no sorting/filtering/pagination logic) — with
  only 5 products per category there's nothing meaningful to page through.
- **Detail page image:** single image only, no carousel arrows/dots (product data has one image
  per product; no carousel logic needed).
- **Color selector:** omitted entirely — no color field exists in the product data.
- **Add to Bag / wishlist:** rendered but not wired to any persistence — the Cart page and
  CartService are a separate future page/plan.
- **Recommended Products:** shows the other products in the *same category* as the current
  product (up to 4, since there are 5 per category), not a mix of all categories.

## Routes

- `/men` → Product Listing page, filtered to `category: 'men'`
- `/women` → Product Listing page, filtered to `category: 'women'`
- `/product/:id` → Product Detail page for that product's `id`

Both `/men` and `/women` route to the same `ProductListing` component; the category is derived
from the matched route path.

## Data model change

Add a `highlights: string[]` field to the `Product` interface in `src/app/data/products.ts`, and
populate it with 2-3 relevant bullets for each of the 10 existing products (e.g. "Classic White
Shirt" → `['100% cotton', 'Machine washable', 'Tailored fit']`).

## Product Listing page

**Location:** `src/app/pages/product-listing/`

- Page title: "Men's Fashion" or "Women's Fashion" (derived from route), with underline accent
  matching the Home page's "Featured Categories" heading style
- Decorative "Show: All" and "Filter by: Latest" dropdowns (static markup, no behavior)
- Responsive grid of product cards for the matched category's products: image, name, description,
  price (`$`-prefixed) — each card links via `routerLink` to `/product/:id`
- Decorative "SHOW MORE" button (static markup, no behavior)

## Product Detail page

**Location:** `src/app/pages/product-detail/`

- Product looked up from `PRODUCTS` by the `id` route param (via `ActivatedRoute`)
- Single product image (no carousel), name, description, price (`$`-prefixed)
- Quantity selector (+/-): local component state, functional (increments/decrements a number,
  minimum 1)
- Size dropdown: local component state, functional (populated from the product's `sizes` array)
- "ADD TO BAG" button and wishlist heart button: rendered per the screenshot's styling, no
  click behavior/persistence
- "Details" section with a "Highlights" bulleted list from the product's `highlights` field
- "Recommended Products" section: up to 4 other products sharing the same `category`, rendered
  with the same card component/style as the Listing page, each linking to its own detail page

## Shared product card

Both pages render product cards identically (image, name, description, price). This should be a
small reusable standalone component (`src/app/shared/product-card/`) rather than duplicated markup,
since both the Listing page and the Detail page's Recommended Products section need it.

## Out of scope

- Sorting/filtering logic for the Listing page's dropdowns
- Pagination ("Show More")
- Multiple images / carousel on the Detail page
- Color selection
- Cart/wishlist persistence (CartService, localStorage) — separate future plan
- Automated tests (manual Chrome testing only, per the project's original design doc)

## Build order

1. Add `highlights` field + data to `products.ts`
2. Build shared `ProductCard` component
3. Build `ProductListing` page using `ProductCard`
4. Build `ProductDetail` page (including "Recommended Products" using `ProductCard`)
5. Wire `/men`, `/women`, `/product/:id` routes
6. Manual verification in Chrome against the provided screenshots
