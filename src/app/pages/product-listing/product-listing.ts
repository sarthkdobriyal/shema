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
