import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ProductItem, ProductService } from "../services/product.service";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-product-list',
  styles: [
    `
    :host {
      width: 100%;
    }

    h1.productTitle {
      color: var(--color-secondary);
    }
  
    .productBase {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  
    img.productimage {
      height: auto;
      width: 100%;
    }
  
    .productimageWrapper {
      display: flex;
      align-items: baseline;
      justify-content: center;
      border-radius: 10px;
      width: 150px;
      height: 150px;
      overflow: hidden;
      margin-right: 20px;
    }
  
    .productContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      margin: 20px;
    }
  
    .productWrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-content: center;
      width: 100%;
      max-width: 500px;
      margin: auto;
    }
  
    .productItem {
      display: flex;
      align-item: flex-start;
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid lightgray;
      background: white;
      cursor: pointer;

      color: inherit;
      text-decoration: none;
    }
  
    .productItemContent {
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      align-items: flex-start;
      margin: 10px;
    }
  
    .itemTitle {
      font-weight: 600;
      margin-bottom: 15px;
    }
    `
  ],
  template: `
  <div class="productContainer">
    <h1 class="productTitle">Product List</h1>
    <div class="productWrapper">
      <p *ngIf="status === 'loading' else loaded">loading...</p>
      <ng-template #loaded>
        <a
          *ngFor="let item of products"
          class="productItem"
          [routerLink]="['/product', item.id]"
        >
          <div class="productimageWrapper">
            <img
              class="productimage"
              alt="Product Image"
              src="{{ errorLoadingImage ? 'assets/noimage.png': item.image }}"
              loading="lazy"
              (error)="onError()"
            />
          </div>

          <div class="productItemContent">
            <div class="itemTitle">{{ item.name }}</div>
            <div>Price: $\{{ item.discount_price }}</div>
            <div>Available: {{ item.inventory_count }}</div>
          </div>
        </a>
      </ng-template>
    </div>
  </div>

  `
})
export class ProductListComponent implements OnInit {
  status = 'loading';
  products: ProductItem[] = [];
  router = inject(Router);
  productService = inject(ProductService);


  errorLoadingImage = false;

  onError(): void {
    this.errorLoadingImage = true;
  }

  ngOnInit() {
    this.productService.getProductList().subscribe((products: ProductItem[]) => {
      this.products = products;
      this.status = 'loaded';
    });
  }
}