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

      (globalThis as any).StyleBuddyTryOn = {
        garment_url: p.imageUrl,
        product_id: String(p.id),
        product_title: p.name,
        product_description: p.description,
        product_type: 'topwear',
        vendor: 'Shema',
        tags: p.highlights,
      };

      // The widget only reads window.StyleBuddyTryOn on script init and when
      // this event fires. Without it, SPA navigation leaves the widget stuck
      // on whatever view it rendered at open time (e.g. the "visit a product
      // page" placeholder). Its handler re-reads the global, updates
      // #outfit_image, and swaps the placeholder for the try-on view.
      window.dispatchEvent(new Event('stylebuddy-tryon-update'));
    });
  }

  increment() {
    this.quantity.update((q) => q + 1);
  }

  decrement() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }
}
