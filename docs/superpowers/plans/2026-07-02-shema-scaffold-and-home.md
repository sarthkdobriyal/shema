# Shema Scaffold + Home Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a new Angular (v21, standalone, TypeScript) project with Tailwind CSS v4 directly
in this directory, add a shared Header/Footer layout, and build the Home page to match the two
provided screenshots (hero banner + featured categories + footer).

**Architecture:** Angular CLI workspace created at the project root (no nested folder). Standalone
components only (no NgModules), Angular Router with a root layout (`app.ts`) rendering
`<app-header>`, `<router-outlet>`, `<app-footer>`. Tailwind v4 for all styling. Product/category
data for the Home page lives in a small typed data file so it can be reused by later pages
(Listing/Detail/Cart), which will be covered by separate follow-up plans once their screenshots
are provided.

**Tech Stack:** Angular CLI 21.x, TypeScript, Tailwind CSS v4 (`@tailwindcss/postcss`), Angular
Router, no backend.

**Verification approach:** This project has no automated tests in scope (per design doc — manual
Chrome testing only). Each task's "verify" step is: run `ng serve`, open `http://localhost:4200`
in Chrome, and visually confirm the described result. Screenshots already provided by the user are
the source of truth for Task 6–8.

**Windows/OneDrive note:** This project folder is under OneDrive
(`...\OneDrive\Desktop\niRJI\angularJSProject`). OneDrive sync can occasionally lock files during
`npm install`. If `npm install` fails with an `EBUSY`/`EPERM` error, pause OneDrive syncing
temporarily and re-run the command — this is mentioned once here so it's not repeated per task.

---

### Task 1: Scaffold the Angular workspace with Tailwind CSS v4

**Files:**
- Create: entire Angular workspace at project root (`angular.json`, `package.json`, `src/**`, etc.)
- Create: `.postcssrc.json` (generated automatically by the CLI, see Step 1)

- [ ] **Step 1: Run the Angular CLI scaffold command**

Run this in PowerShell from the project root
(`c:\Users\dobri\OneDrive\Desktop\niRJI\angularJSProject`):

```powershell
npx -y @angular/cli@21 new shema --directory=. --style=tailwind --routing=true --ssr=false --skip-tests --zoneless=false --ai-config=none
```

Angular CLI 21 has built-in Tailwind CSS v4 support via `--style=tailwind` — it installs
`tailwindcss` and `@tailwindcss/postcss`, creates `.postcssrc.json`, and adds `@import
'tailwindcss';` to `src/styles.css` automatically, so no manual Tailwind setup is needed. The
`--zoneless=false` and `--ai-config=none` flags answer the CLI's interactive prompts up front so
it runs non-interactively.

Expected: a full Angular project is created in the current directory (`angular.json`,
`package.json`, `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`, `src/app/app.config.ts`,
`src/app/app.routes.ts`, `src/index.html`, `src/main.ts`, `src/styles.css`, `.postcssrc.json`,
`public/favicon.ico`), with `tailwindcss` and `@tailwindcss/postcss` present in `package.json` and
`node_modules` installed (no `--skip-install` was passed, so this happens automatically). A git
repository is also initialized automatically (default CLI behavior).

- [ ] **Step 2: Verify the dev server runs**

```powershell
npm start
```

Expected: terminal prints something like `Local: http://localhost:4200/` with no errors. Open
`http://localhost:4200` in Chrome — you should see the default Angular welcome page. Leave this
running; `ng serve` auto-reloads on file changes, so keep it running through the rest of this plan
and just refresh Chrome after each task.

- [ ] **Step 3: Verify Tailwind is working**

Open `src/app/app.html` and replace its entire contents with:

```html
<h1 class="text-4xl font-bold text-yellow-500 underline">Tailwind is working</h1>
```

Save, and check Chrome (it should auto-reload). Expected: large bold yellow underlined text
reading "Tailwind is working". If the text is unstyled (plain black serif), Tailwind is not wired
up correctly — recheck Step 1's generated `.postcssrc.json` and `src/styles.css` before continuing.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "chore: scaffold Angular workspace with Tailwind CSS v4"
```

(A git repo was already initialized by `ng new` in Step 1, so no `git init` is needed here.)

---

### Task 2: Build the shared Header component

**Files:**
- Create: `src/app/layout/header/header.ts`
- Create: `src/app/layout/header/header.html`
- Create: `src/app/layout/header/header.css`

- [ ] **Step 1: Generate the standalone component**

```powershell
npx ng generate component layout/header --skip-tests
```

Expected: creates `src/app/layout/header/header.ts`, `header.html`, `header.css` (Angular 21
default naming has no `.component.` in the filename).

- [ ] **Step 2: Write the header template**

Replace the contents of `src/app/layout/header/header.html` with:

```html
<div class="w-full">
  <div class="h-2 bg-slate-700"></div>
  <div class="flex items-center justify-between gap-6 px-8 py-4 bg-white">
    <a routerLink="/" class="text-3xl font-extrabold tracking-tight text-slate-900">SHEMA</a>

    <div class="flex-1 max-w-2xl flex">
      <input
        type="text"
        placeholder="Search for products"
        class="w-full border-2 border-yellow-400 rounded-l-full px-5 py-2 focus:outline-none"
      />
      <button
        type="button"
        aria-label="Search"
        class="bg-yellow-400 border-2 border-yellow-400 rounded-r-full px-5 flex items-center justify-center"
      >
        🔍
      </button>
    </div>

    <div class="flex items-center gap-3">
      <a
        routerLink="/account"
        aria-label="Account"
        class="w-11 h-11 flex items-center justify-center rounded-full border-2 border-yellow-400"
        >👤</a
      >
      <a
        routerLink="/wishlist"
        aria-label="Wishlist"
        class="w-11 h-11 flex items-center justify-center rounded-full border-2 border-yellow-400"
        >♡</a
      >
      <a
        routerLink="/cart"
        aria-label="Cart"
        class="w-11 h-11 flex items-center justify-center rounded-full border-2 border-yellow-400"
        >🛒</a
      >
    </div>
  </div>

  <nav class="flex items-center justify-center gap-12 py-3 bg-white border-t border-gray-100">
    <a routerLink="/" class="font-medium text-slate-900 hover:text-yellow-600">Home</a>
    <a routerLink="/men" class="font-medium text-slate-900 hover:text-yellow-600">Men</a>
    <a routerLink="/women" class="font-medium text-slate-900 hover:text-yellow-600">Women</a>
  </nav>
</div>
```

- [ ] **Step 3: Ensure RouterLink is imported**

Open `src/app/layout/header/header.ts`. It should look like this (the generator creates the
`@Component` decorator; add `RouterLink` to the `imports` array):

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
```

- [ ] **Step 4: Commit**

```powershell
git add src/app/layout/header
git commit -m "feat: add shared header component"
```

---

### Task 3: Build the shared Footer component

**Files:**
- Create: `src/app/layout/footer/footer.ts`
- Create: `src/app/layout/footer/footer.html`
- Create: `src/app/layout/footer/footer.css`

- [ ] **Step 1: Generate the standalone component**

```powershell
npx ng generate component layout/footer --skip-tests
```

- [ ] **Step 2: Write the footer template**

Replace the contents of `src/app/layout/footer/footer.html` with:

```html
<footer class="bg-yellow-300">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-10 px-8 py-12 max-w-6xl mx-auto">
    <div>
      <h3 class="text-xl font-bold text-slate-900 mb-4">Help</h3>
      <ul class="space-y-2 text-slate-800">
        <li><a href="#">Shipping</a></li>
        <li><a href="#">Refund</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Accessiblity</a></li>
      </ul>
    </div>

    <div>
      <h3 class="text-xl font-bold text-slate-900 mb-4">Contact Us</h3>
      <ul class="space-y-2 text-slate-800">
        <li>📞 +123 4567 890</li>
        <li>✉️ shop&#64;shema.com</li>
        <li>📍 Addis Ababa, Ethiopia</li>
      </ul>
    </div>

    <div>
      <h3 class="text-xl font-bold text-slate-900 mb-4">Stay Connected</h3>
      <div class="flex gap-4 text-2xl">
        <a href="#" aria-label="Twitter">🐦</a>
        <a href="#" aria-label="Instagram">📷</a>
        <a href="#" aria-label="YouTube">▶️</a>
        <a href="#" aria-label="Telegram">✈️</a>
        <a href="#" aria-label="Pinterest">📌</a>
      </div>
    </div>
  </div>

  <div class="bg-slate-900 text-yellow-300 text-center py-4 text-sm">
    &copy;2026 Shema Ltd. || <a href="#">Terms &amp; Condition</a> ||
    <a href="#">Privacy Policy</a>
  </div>
</footer>
```

- [ ] **Step 3: Commit**

```powershell
git add src/app/layout/footer
git commit -m "feat: add shared footer component"
```

---

### Task 4: Wire Header + Footer into the root layout

**Files:**
- Modify: `src/app/app.ts`
- Modify: `src/app/app.html`

- [ ] **Step 1: Update the root component**

Replace the contents of `src/app/app.ts` with:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
```

- [ ] **Step 2: Update the root template**

Replace the contents of `src/app/app.html` with:

```html
<app-header></app-header>
<router-outlet></router-outlet>
<app-footer></app-footer>
```

- [ ] **Step 3: Verify in Chrome**

Check `http://localhost:4200` (the dev server should still be running from Task 1). Expected: you
see the header (logo, search bar, account/wishlist/cart icons, Home/Men/Women nav) at the top, an
empty middle (no route content yet), and the yellow footer at the bottom.

- [ ] **Step 4: Commit**

```powershell
git add src/app/app.ts src/app/app.html
git commit -m "feat: wire header and footer into root layout"
```

---

### Task 5: Create dummy product/category data

**Files:**
- Create: `src/app/data/products.ts`

- [ ] **Step 1: Write the product data file**

Create `src/app/data/products.ts`:

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
  },
  {
    id: 2,
    name: 'Black Blazer',
    category: 'men',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=600',
    description: 'Sharp black blazer suitable for formal occasions.',
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 3,
    name: 'Denim Jacket',
    category: 'men',
    price: 54.5,
    imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=600',
    description: 'Rugged denim jacket for a casual look.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 4,
    name: 'Slim Fit Trousers',
    category: 'men',
    price: 39.0,
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    description: 'Comfortable slim fit trousers for daily use.',
    sizes: ['30', '32', '34', '36'],
  },
  {
    id: 5,
    name: 'Casual Sneakers',
    category: 'men',
    price: 65.0,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
    description: 'Lightweight sneakers for all-day comfort.',
    sizes: ['8', '9', '10', '11'],
  },
  {
    id: 6,
    name: 'Floral Kurti Set',
    category: 'women',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600',
    description: 'Elegant floral kurti with matching pants.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 7,
    name: 'Summer Floral Dress',
    category: 'women',
    price: 49.5,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    description: 'Light and breezy dress, perfect for summer.',
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 8,
    name: 'High-Waist Jeans',
    category: 'women',
    price: 42.0,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
    description: 'Flattering high-waist jeans with stretch fit.',
    sizes: ['26', '28', '30', '32'],
  },
  {
    id: 9,
    name: 'Cropped Cardigan',
    category: 'women',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600',
    description: 'Soft cropped cardigan, easy to layer.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 10,
    name: 'Strappy Heels',
    category: 'women',
    price: 58.0,
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
    description: 'Elegant strappy heels for evening wear.',
    sizes: ['6', '7', '8', '9'],
  },
];
```

- [ ] **Step 2: Commit**

```powershell
git add src/app/data/products.ts
git commit -m "feat: add dummy product data"
```

---

### Task 6: Build the Home page — hero section

**Files:**
- Create: `src/app/pages/home/home.ts`
- Create: `src/app/pages/home/home.html`
- Create: `src/app/pages/home/home.css`

- [ ] **Step 1: Generate the standalone component**

```powershell
npx ng generate component pages/home --skip-tests
```

- [ ] **Step 2: Write the hero section markup**

Replace the contents of `src/app/pages/home/home.html` with (hero section only for now):

```html
<section class="bg-yellow-300 flex flex-col md:flex-row items-center px-8 md:px-20 py-16 gap-8">
  <div class="flex-1">
    <p class="uppercase font-semibold tracking-wide text-slate-900 mb-3">
      Up to 25% discount
    </p>
    <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
      Checkout The Best<br />Fashion Style
    </h1>
    <a
      routerLink="/men"
      class="inline-block border-2 border-slate-900 rounded-full px-8 py-3 font-bold text-slate-900 hover:bg-slate-900 hover:text-yellow-300 transition"
    >
      SHOP NOW
    </a>
  </div>
  <div class="flex-1 flex justify-center">
    <img
      src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700"
      alt="Fashion model"
      class="max-h-[500px] object-cover rounded"
    />
  </div>
</section>
```

- [ ] **Step 3: Import RouterLink**

Open `src/app/pages/home/home.ts` and ensure it matches:

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
```

- [ ] **Step 4: Commit**

```powershell
git add src/app/pages/home
git commit -m "feat: add home page hero section"
```

---

### Task 7: Build the Home page — featured categories section

**Files:**
- Modify: `src/app/pages/home/home.ts`
- Modify: `src/app/pages/home/home.html`

- [ ] **Step 1: Add category data to the component**

Update `src/app/pages/home/home.ts` to expose the two featured categories:

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeaturedCategory {
  label: string;
  imageUrl: string;
  routerLink: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  featuredCategories: FeaturedCategory[] = [
    {
      label: 'Men',
      imageUrl: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600',
      routerLink: '/men',
    },
    {
      label: 'Women',
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
      routerLink: '/women',
    },
  ];
}
```

- [ ] **Step 2: Append the featured categories section to the template**

Append this to the end of `src/app/pages/home/home.html` (after the hero `</section>`):

```html
<section class="px-8 py-16 text-center">
  <h2 class="text-4xl font-extrabold text-slate-900 mb-2">Featured Categories</h2>
  <div class="w-16 h-1 bg-yellow-400 mx-auto mb-12"></div>

  <div class="flex flex-wrap justify-center gap-10">
    @for (cat of featuredCategories; track cat.label) {
      <div class="w-72 border border-gray-200 shadow-sm">
        <img [src]="cat.imageUrl" [alt]="cat.label" class="w-full h-80 object-cover" />
        <div class="py-4">
          <a
            [routerLink]="cat.routerLink"
            class="inline-block bg-yellow-400 rounded-full px-6 py-2 font-bold text-slate-900"
          >
            SHOP NOW
          </a>
        </div>
      </div>
    }
  </div>
</section>
```

- [ ] **Step 3: Commit**

```powershell
git add src/app/pages/home
git commit -m "feat: add home page featured categories section"
```

---

### Task 8: Wire the Home page into routing and do final verification

**Files:**
- Modify: `src/app/app.routes.ts`

- [ ] **Step 1: Add the route**

Replace the contents of `src/app/app.routes.ts` with:

```typescript
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [{ path: '', component: Home }];
```

- [ ] **Step 2: Verify against the screenshots**

With `ng serve` still running, open `http://localhost:4200` in Chrome and compare side-by-side
with the two homepage screenshots you provided:
- Header: logo "SHEMA", search bar, account/wishlist/cart icon buttons, Home/Men/Women nav
- Hero: yellow background, "UP TO 25% DISCOUNT", "Checkout The Best Fashion Style", "SHOP NOW"
  button, model image on the right
- "Featured Categories" heading with underline, two cards (Men, Women) each with a "SHOP NOW"
  button
- Footer: yellow background, Help / Contact Us / Stay Connected columns, black copyright bar

Expected: overall layout and content match; exact photos/fonts will differ since we're using
placeholder stock images and system fonts, that's fine.

- [ ] **Step 3: Commit**

```powershell
git add src/app/app.routes.ts
git commit -m "feat: route home page at root path"
```

---

## After this plan

Once you're happy with the Home page, send screenshots for the Product Listing page (Men/Women)
and we'll write a follow-up plan (`docs/superpowers/plans/<date>-shema-product-listing.md`) for
it, then Product Detail, then Cart — each as its own small plan, per the design doc's build order.
