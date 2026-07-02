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
