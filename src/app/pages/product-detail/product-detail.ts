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
  id = input.required<string>();

  product = computed(() => PRODUCTS.find((p) => p.id === Number(this.id())));

  recommended = computed(() => {
    const p = this.product();
    if (!p) return [];
    return PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  });

  quantity = signal(1);
  selectedSize = signal('');

  constructor() {
    effect(() => {
      const p = this.product();
      if (!p) return;

      const config = {
        garment_url: p.imageUrl,
        product_id: String(p.id),
        product_title: p.name,
        product_description: p.description,
        product_type: 'topwear',
        vendor: 'Shema',
        tags: p.highlights,
      };

      console.log('[StyleBuddy] Setting config:', config);
      (globalThis as any).StyleBuddyTryOn = config;

      // Check if the widget script has already loaded and exposes a reinit API
      const w = globalThis as any;
      console.log('[StyleBuddy] Script loaded? window.StyleBuddyWidget =', w.StyleBuddyWidget);
      console.log('[StyleBuddy] Script loaded? window.__styleBuddy =', w.__styleBuddy);
      console.log('[StyleBuddy] All StyleBuddy-related globals:', Object.keys(w).filter(k => k.toLowerCase().includes('stylebuddy') || k.toLowerCase().includes('tryon')));

      // If the widget exposes a reinit / update method, call it
      if (typeof w.StyleBuddyWidget?.init === 'function') {
        console.log('[StyleBuddy] Calling StyleBuddyWidget.init()');
        w.StyleBuddyWidget.init();
      } else if (typeof w.StyleBuddyTryOnInit === 'function') {
        console.log('[StyleBuddy] Calling StyleBuddyTryOnInit()');
        w.StyleBuddyTryOnInit();
      } else {
        console.warn('[StyleBuddy] No reinit function found. Widget may have loaded before config was set.');
      }
    });
  }

  increment() {
    this.quantity.update((q) => q + 1);
  }

  decrement() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }
}
