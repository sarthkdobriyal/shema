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
