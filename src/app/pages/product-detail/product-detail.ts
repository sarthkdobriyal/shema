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

      this.updateWidgetImage(p.imageUrl);
    });
  }

  // The widget's own preview <img id="outfit_image"> only gets the garment_url
  // set once, when its script builds its DOM. It exposes no update API, but the
  // element itself is a stable, addressable node, so we patch its src directly
  // instead of reloading the widget (which would close the open panel).
  private updateWidgetImage(imageUrl: string) {
    const existing = document.getElementById('outfit_image') as HTMLImageElement | null;
    if (existing) {
      existing.src = imageUrl;
      return;
    }

    const observer = new MutationObserver(() => {
      const img = document.getElementById('outfit_image') as HTMLImageElement | null;
      if (img) {
        img.src = imageUrl;
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  increment() {
    this.quantity.update((q) => q + 1);
  }

  decrement() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }
}
