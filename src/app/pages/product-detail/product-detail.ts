import { Component, computed, input, signal } from '@angular/core';
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

  increment() {
    this.quantity.update((q) => q + 1);
  }

  decrement() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }
}
