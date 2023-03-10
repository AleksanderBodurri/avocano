import { NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ProductItemComponent } from "../components/product-item.component";
import { ProductItem, ProductService } from "../services/product.service";

@Component({
  standalone: true,
  imports: [NgIf, ProductItemComponent],
  selector: 'app-home',
  styles: [
    `
    .homeBase {
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    `
  ],
  template: `
    <div class="homeBase" *ngIf="productItem">
      <p *ngIf="status === 'loading' else loaded">loading...</p>

      <ng-template #loaded>
        <app-product-item [productId]="productItem.id" [productItem]="productItem"/>
      </ng-template>
    </div>
    `
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  status = 'loading';
  productItem: ProductItem|undefined = undefined;

  ngOnInit() {
    this.productService.getActiveProduct().subscribe((productItem: ProductItem) => {
      this.status = 'loaded';
      this.productItem = productItem;
    });
  }
}