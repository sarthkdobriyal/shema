# Product Listing + Product Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Product Listing page (`/men`, `/women`) and a Product Detail page
(`/product/:id`) to the Shema demo ecommerce site, matching the user-provided screenshots, per
`docs/superpowers/specs/2026-07-02-product-listing-and-detail-design.md`.

**Architecture:** Two new standalone page components (`ProductListing`, `ProductDetail`) plus one
new shared standalone component (`ProductCard`) reused by both. `ProductListing` and
`ProductDetail` receive their route data (category/title, and the product id) via Angular's
`withComponentInputBinding()` router feature — bound directly to signal `input()`s, no manual
`ActivatedRoute` subscription code needed. Product data gains a `highlights: string[]` field.

**Tech Stack:** Angular 21 (standalone components, signals, `@if`/`@for` control flow), Tailwind
CSS v4, Angular Router with component input binding — same stack as the existing Home page.

**Verification approach:** No automated tests in scope (manual Chrome testing only, per the
project's design doc). Each task's implementer verifies with `npx ng build` (must succeed with no
errors). The final task includes live browser verification against the provided screenshots,
which the controller (not a subagent) performs directly.

---

### Task 1: Add `highlights` field to product data

**Files:**
- Modify: `src/app/data/products.ts`

- [ ] **Step 1: Add the field to the `Product` interface and populate every product**

Replace the entire contents of `src/app/data/products.ts` with:

```typescript
export type Category = 'men' | 'women';

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  imageUrl: string;
  description: string;
  sizes: string[];
  highlights: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Classic White Shirt',
    category: 'men',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600',
    description: 'A crisp, tailored white shirt for everyday wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    highlights: ['100% cotton', 'Machine washable', 'Tailored fit'],
  },
  {
    id: 2,
    name: 'Black Blazer',
    category: 'men',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=600',
    description: 'Sharp black blazer suitable for formal occasions.',
    sizes: ['M', 'L', 'XL'],
    highlights: ['Slim tailored cut', 'Two-button closure', 'Dry clean only'],
  },
  {
    id: 3,
    name: 'Denim Jacket',
    category: 'men',
    price: 54.5,
    imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=600',
    description: 'Rugged denim jacket for a casual look.',
    sizes: ['S', 'M', 'L'],
    highlights: ['Sturdy cotton denim', 'Button-front closure', 'Classic collar'],
  },
  {
    id: 4,
    name: 'Slim Fit Trousers',
    category: 'men',
    price: 39.0,
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    description: 'Comfortable slim fit trousers for daily use.',
    sizes: ['30', '32', '34', '36'],
    highlights: ['Stretch fabric blend', 'Slim tapered leg', 'Machine washable'],
  },
  {
    id: 5,
    name: 'Casual Sneakers',
    category: 'men',
    price: 65.0,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
    description: 'Lightweight sneakers for all-day comfort.',
    sizes: ['8', '9', '10', '11'],
    highlights: ['Breathable mesh upper', 'Cushioned insole', 'Rubber outsole'],
  },
  {
    id: 6,
    name: 'Floral Kurti Set',
    category: 'women',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600',
    description: 'Elegant floral kurti with matching pants.',
    sizes: ['S', 'M', 'L'],
    highlights: ['Soft rayon fabric', 'Includes matching pants', 'Hand wash recommended'],
  },
  {
    id: 7,
    name: 'Summer Floral Dress',
    category: 'women',
    price: 49.5,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    description: 'Light and breezy dress, perfect for summer.',
    sizes: ['XS', 'S', 'M', 'L'],
    highlights: ['Lightweight breathable fabric', 'Relaxed A-line fit', 'Machine washable'],
  },
  {
    id: 8,
    name: 'High-Waist Jeans',
    category: 'women',
    price: 42.0,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
    description: 'Flattering high-waist jeans with stretch fit.',
    sizes: ['26', '28', '30', '32'],
    highlights: ['Stretch denim', 'High-rise waist', 'Five-pocket styling'],
  },
  {
    id: 9,
    name: 'Cropped Cardigan',
    category: 'women',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600',
    description: 'Soft cropped cardigan, easy to layer.',
    sizes: ['S', 'M', 'L'],
    highlights: ['Soft knit fabric', 'Cropped length', 'Easy layering piece'],
  },
  {
    id: 10,
    name: 'Strappy Heels',
    category: 'women',
    price: 58.0,
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
    description: 'Elegant strappy heels for evening wear.',
    sizes: ['6', '7', '8', '9'],
    highlights: ['Faux leather straps', 'Cushioned footbed', 'Adjustable buckle closure'],
  },
];
```

- [ ] **Step 2: Verify the build succeeds**

Run: `npx ng build`
Expected: succeeds with no errors (this file isn't imported anywhere new yet).

- [ ] **Step 3: Commit**

```powershell
git add src/app/data/products.ts
git commit -m "feat: add highlights field to product data"
```

---

### Task 2: Build the shared ProductCard component

**Files:**
- Create: `src/app/shared/product-card/product-card.ts`
- Create: `src/app/shared/product-card/product-card.html`
- Create: `src/app/shared/product-card/product-card.css`

- [ ] **Step 1: Generate the standalone component**

```powershell
npx ng generate component shared/product-card --skip-tests
```

- [ ] **Step 2: Write the component class**

Replace the entire contents of `src/app/shared/product-card/product-card.ts` with:

```typescript
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../data/products';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
}
```

- [ ] **Step 3: Write the template**

Replace the entire contents of `src/app/shared/product-card/product-card.html` with:

```html
<a
  [routerLink]="['/product', product().id]"
  class="w-64 border border-gray-200 shadow-sm block hover:shadow-md transition"
>
  <img
    [src]="product().imageUrl"
    [alt]="product().name"
    class="w-full h-72 object-cover"
  />
  <div class="p-4">
    <h3 class="font-bold text-slate-900">{{ product().name }}</h3>
    <p class="text-sm text-slate-600 mb-2">{{ product().description }}</p>
    <p class="font-bold text-slate-900">${{ product().price.toFixed(2) }}</p>
  </div>
</a>
```

- [ ] **Step 4: Verify the build succeeds**

Run: `npx ng build`
Expected: succeeds with no errors. This component isn't used anywhere yet, which is fine.

- [ ] **Step 5: Commit**

```powershell
git add src/app/shared/product-card
git commit -m "feat: add shared product card component"
```

---

### Task 3: Build the Product Listing page

**Files:**
- Create: `src/app/pages/product-listing/product-listing.ts`
- Create: `src/app/pages/product-listing/product-listing.html`
- Create: `src/app/pages/product-listing/product-listing.css`

- [ ] **Step 1: Generate the standalone component**

```powershell
npx ng generate component pages/product-listing --skip-tests
```

- [ ] **Step 2: Write the component class**

Replace the entire contents of `src/app/pages/product-listing/product-listing.ts` with:

```typescript
import { Component, computed, input } from '@angular/core';
import { Category, PRODUCTS } from '../../data/products';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-product-listing',
  imports: [ProductCard],
  templateUrl: './product-listing.html',
  styleUrl: './product-listing.css',
})
export class ProductListing {
  category = input.required<Category>();
  title = input.required<string>();

  products = computed(() => PRODUCTS.filter((p) => p.category === this.category()));
}
```

These `category` and `title` inputs are populated automatically from each route's static `data`
(configured in Task 5) via Angular's `withComponentInputBinding()` router feature — no
`ActivatedRoute` injection needed here.

- [ ] **Step 3: Write the template**

Replace the entire contents of `src/app/pages/product-listing/product-listing.html` with:

```html
<section class="px-8 py-12">
  <div class="flex items-end justify-between flex-wrap gap-6 mb-10">
    <div>
      <h1 class="text-4xl font-extrabold text-slate-900 mb-2">{{ title() }}</h1>
      <div class="w-16 h-1 bg-yellow-400"></div>
    </div>

    <div class="flex gap-6">
      <label class="flex flex-col text-sm text-slate-600">
        Show
        <select class="border rounded px-3 py-2 mt-1">
          <option>All</option>
        </select>
      </label>
      <label class="flex flex-col text-sm text-slate-600">
        Filter by
        <select class="border rounded px-3 py-2 mt-1">
          <option>Latest</option>
        </select>
      </label>
    </div>
  </div>

  <div class="flex flex-wrap gap-8">
    @for (p of products(); track p.id) {
      <app-product-card [product]="p" />
    }
  </div>

  <div class="text-center mt-12">
    <button
      type="button"
      class="bg-yellow-400 rounded-full px-8 py-3 font-bold text-slate-900"
    >
      SHOW MORE
    </button>
  </div>
</section>
```

The "Show"/"Filter by" dropdowns and "SHOW MORE" button are intentionally static markup with no
behavior — per the design spec, there's nothing meaningful to filter/paginate with only 5 products
per category.

- [ ] **Step 4: Verify the build succeeds**

Run: `npx ng build`
Expected: succeeds with no errors. This page isn't routed yet, which is fine (Task 5 wires it up).

- [ ] **Step 5: Commit**

```powershell
git add src/app/pages/product-listing
git commit -m "feat: add product listing page"
```

---

### Task 4: Build the Product Detail page

**Files:**
- Create: `src/app/pages/product-detail/product-detail.ts`
- Create: `src/app/pages/product-detail/product-detail.html`
- Create: `src/app/pages/product-detail/product-detail.css`

- [ ] **Step 1: Generate the standalone component**

```powershell
npx ng generate component pages/product-detail --skip-tests
```

- [ ] **Step 2: Write the component class**

Replace the entire contents of `src/app/pages/product-detail/product-detail.ts` with:

```typescript
import { Component, computed, effect, input, signal } from '@angular/core';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-product-detail',
  imports: [ProductCard],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  id = input<string>();

  product = computed(() => PRODUCTS.find((p) => p.id === Number(this.id())));

  recommended = computed(() => {
    const current = this.product();
    if (!current) {
      return [];
    }
    return PRODUCTS.filter(
      (p) => p.category === current.category && p.id !== current.id,
    ).slice(0, 4);
  });

  quantity = signal(1);
  selectedSize = signal('');

  constructor() {
    effect(() => {
      const sizes = this.product()?.sizes ?? [];
      this.quantity.set(1);
      this.selectedSize.set(sizes[0] ?? '');
    });
  }

  increment(): void {
    this.quantity.update((q) => q + 1);
  }

  decrement(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  onSizeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedSize.set(value);
  }
}
```

The `id` input is populated automatically from the `:id` route param via
`withComponentInputBinding()` (configured in Task 5). Using a signal `input()` (rather than reading
`ActivatedRoute.snapshot` once) means that if the user navigates from one product's detail page to
another's (e.g. clicking a Recommended Products card), Angular reuses the component instance and
`id()` updates reactively — `product`, `recommended`, and the `effect()` resetting quantity/size
all re-run automatically. A snapshot-based approach would silently show stale data in that
scenario.

- [ ] **Step 3: Write the template**

Replace the entire contents of `src/app/pages/product-detail/product-detail.html` with:

```html
@if (product(); as p) {
  <section class="px-8 py-12 flex flex-col md:flex-row gap-12">
    <div class="flex-1">
      <img [src]="p.imageUrl" [alt]="p.name" class="w-full max-w-xl rounded" />
    </div>

    <div class="flex-1 max-w-md">
      <h1 class="text-3xl font-bold text-slate-900 mb-2">{{ p.name }}</h1>
      <p class="text-slate-600 mb-6">{{ p.description }}</p>
      <p class="text-2xl font-bold text-slate-900 mb-6">${{ p.price.toFixed(2) }}</p>

      <div class="flex items-center gap-6 mb-6">
        <div class="flex items-center gap-4 border rounded-full px-4 py-2">
          <button type="button" (click)="decrement()" aria-label="Decrease quantity">
            &minus;
          </button>
          <span>{{ quantity() }}</span>
          <button type="button" (click)="increment()" aria-label="Increase quantity">
            +
          </button>
        </div>

        <label class="flex flex-col text-sm text-slate-600">
          Size
          <select
            [value]="selectedSize()"
            (change)="onSizeChange($event)"
            class="border rounded px-3 py-2 mt-1"
          >
            @for (size of p.sizes; track size) {
              <option [value]="size">{{ size }}</option>
            }
          </select>
        </label>
      </div>

      <div class="flex items-center gap-4">
        <button
          type="button"
          class="bg-slate-900 text-yellow-300 font-bold rounded-full px-8 py-3"
        >
          ADD TO BAG
        </button>
        <button
          type="button"
          aria-label="Add to wishlist"
          class="w-12 h-12 rounded-full bg-slate-900 text-yellow-300 flex items-center justify-center"
        >
          ♡
        </button>
      </div>
    </div>
  </section>

  <section class="px-8 py-8 bg-gray-50">
    <h2 class="text-xl font-bold text-slate-900 mb-4 border-l-4 border-slate-900 pl-3">
      Details
    </h2>
    <h3 class="font-bold text-slate-900 mb-2">Highlights</h3>
    <ul class="list-disc list-inside text-slate-700 space-y-1">
      @for (h of p.highlights; track h) {
        <li>{{ h }}</li>
      }
    </ul>
  </section>

  <section class="px-8 py-16 text-center">
    <h2 class="text-4xl font-extrabold text-slate-900 mb-2">Recommended Products</h2>
    <div class="w-16 h-1 bg-yellow-400 mx-auto mb-12"></div>
    <div class="flex flex-wrap justify-center gap-8">
      @for (rec of recommended(); track rec.id) {
        <app-product-card [product]="rec" />
      }
    </div>
  </section>
}
```

The "ADD TO BAG" and wishlist heart buttons are intentionally static markup with no click handler —
per the design spec, cart/wishlist persistence is a separate future page/plan. There's no "COLOR"
section (no color field exists in the product data) and no image carousel (each product has a
single image).

- [ ] **Step 4: Verify the build succeeds**

Run: `npx ng build`
Expected: succeeds with no errors. This page isn't routed yet, which is fine (Task 5 wires it up).

- [ ] **Step 5: Commit**

```powershell
git add src/app/pages/product-detail
git commit -m "feat: add product detail page"
```

---

### Task 5: Wire routes and enable component input binding

**Files:**
- Modify: `src/app/app.routes.ts`
- Modify: `src/app/app.config.ts`

- [ ] **Step 1: Update the routes**

Replace the entire contents of `src/app/app.routes.ts` with:

```typescript
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductListing } from './pages/product-listing/product-listing';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'men',
    component: ProductListing,
    data: { category: 'men', title: "Men's Fashion" },
  },
  {
    path: 'women',
    component: ProductListing,
    data: { category: 'women', title: "Women's Fashion" },
  },
  { path: 'product/:id', component: ProductDetail },
];
```

- [ ] **Step 2: Enable component input binding**

Open `src/app/app.config.ts`. Its current contents are:

```typescript
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
```

Replace it with:

```typescript
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
```

This is what makes `ProductListing`'s `category`/`title` inputs and `ProductDetail`'s `id` input
get populated automatically from route data/params — without it, those inputs would stay
`undefined` and both pages would render empty.

- [ ] **Step 3: Verify the build succeeds**

Run: `npx ng build`
Expected: succeeds with no errors.

- [ ] **Step 4: Commit**

```powershell
git add src/app/app.routes.ts src/app/app.config.ts
git commit -m "feat: route product listing and detail pages"
```

---

### Task 6: Final verification in Chrome

This task is performed by the controller directly (not a subagent), since it requires a live
browser to compare against the screenshots.

- [ ] **Step 1: Start the dev server**

```powershell
npm start
```

- [ ] **Step 2: Verify the Product Listing page**

Open `http://localhost:4200/men` in Chrome. Compare against the "Men's Fashion" screenshot:
- "Men's Fashion" heading with yellow underline
- "Show" / "Filter by" dropdowns top-right
- Grid of 5 product cards (image, name, description, `$`-prefixed price)
- "SHOW MORE" button below the grid
- Clicking a product card navigates to its detail page

Also check `http://localhost:4200/women` shows "Women's Fashion" with the 5 women's products.

- [ ] **Step 3: Verify the Product Detail page**

Click into a product from the listing page (or navigate directly to
`http://localhost:4200/product/1`). Compare against the "Light Gold Lungi" screenshot's layout
(content will differ since we're using our own 5+5 products, not the screenshot's products):
- Product image, name, description, `$`-prefixed price
- Quantity +/- buttons actually change the displayed number
- Size dropdown shows that product's sizes
- "ADD TO BAG" and wishlist buttons are present (no click behavior expected)
- "Details" section with a "Highlights" bullet list
- "Recommended Products" section showing up to 4 other products from the same category
- Clicking a Recommended Products card navigates to that product's own detail page, and the page
  content updates correctly (this specifically tests the signal-based `id` input reactivity from
  Task 4)

- [ ] **Step 4: Check the browser console**

Confirm no unexpected errors in the DevTools console while navigating between Home → Men → a
product → a recommended product → Women.

- [ ] **Step 5: Stop the dev server**

Press `Ctrl+C` in the terminal running `npm start`.
