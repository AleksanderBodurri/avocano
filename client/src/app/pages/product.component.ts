import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductItemComponent } from "../components/product-item.component";
import { ProductItem, ProductService } from "../services/product.service";

@Component({
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  selector: 'app-product',
  styles: [
    `
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
    
  <div class="productBase" *ngIf="productItem">
    <p *ngIf="status === 'loading' else loaded">loading...</p>

    <ng-template #loaded>
      <app-product-item [productId]="productItem.id" [productItem]="productItem"/>
    </ng-template>
  </div>

  `
})
export class ProductComponent {
  productItem: ProductItem|undefined = undefined;
  productId: number|undefined = undefined;
  status = 'loading';
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.productId = parseInt(params['id'], 10);

        this.getProduct();
      }
    });
  }

  private getProduct(): void {
    if (this.productId === undefined) {
      return;
    }

    this.productService.getProduct(this.productId).subscribe((productItem: ProductItem) => {
      this.productItem = productItem;
      this.status = 'loaded';
    })
  }
}