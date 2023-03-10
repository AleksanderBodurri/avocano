import { NgFor, NgIf, NgOptimizedImage } from "@angular/common";
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ProductItem, ProductService } from "../services/product.service";
import { Testimonial, TestimonialService } from "../services/testimonial.service";


@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatDialogModule,
    NgOptimizedImage
  ],
  selector: 'app-product-item',
  styles: [
    `
    .buyButton {
      margin-top: 10px;
      padding: 10px;
      background-color: var(--color-action);
      color: var(--color-action-text);
      border-radius: 2px;
      text-transform: uppercase;
      text-decoration: none;
    }
  
    .itemTitle {
      color: var(--color-secondary);
    }
  
    .productItemContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 20px;
    }
  
    .productItemWrapper {
      display: flex;
      flex-direction: row;
    }
  
    @media screen and (max-width: 600px) {
      .productItemWrapper {
        flex-direction: column;
      }
    }
  
    .productItemContent {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: space-evenly;
      margin: 30px;
    }
  
    .testimonialsWrapper {
      margin-top: 20px;
      width: 100%;
    }
  
    .testimonialsHeader {
      padding: 10px;
      text-align: left;
    }
  
    .testimonialsContent {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: #ededed;
    }
  
    .testimonialsItem {
      width: 100%;
      border-bottom: 1px solid lightgrey;
    }
  
    .testimonialItemContent {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;
      margin: 10px;
    }
  
    .testimonialsContent {
      text-align: left;
    }
  
    .rating {
      padding: 10px 0 10px 0;
      color: orange;
    }
  
    .reviewerDetails {
      font-size: 90%;
    }
  
    .reviewSummary {
      font-weight: bold;
      margin: 10px 0 10px 0;
    }
  
    .reviewDescription {
      font-size: 90%;
    }
  
    .price {
      display: flex;
      flex-direction: column;
      text-align: left;
    }
  
    .retailPrice {
      text-decoration: line-through;
      margin-bottom: 10px;
      color: grey;
    }
  
    .discountPrice {
      font-weight: bold;
      font-size: 120%;
    }
  
    .discountRate {
      color: green;
    }
  
    .dialogWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  
    .productimageWrapper {
      display: flex;
      align-items: baseline;
      justify-content: center;
      border-radius: 10px;
      background: #fff;
      width: 300px;
      height: 300px;
      overflow: hidden;
      margin: 30px;
    }
  
    img.productimage {
      height: auto;
      width: 100%;
    }
  
    img.oopsAvocado {
      width: auto;
      height: 200px;
      padding: 10px;
    }
    `
  ],
  template: `
    <div class="productItemContainer" *ngIf="productItem">
      <div class="productItemWrapper">
        <div class="productimageWrapper">
          <img
            class="productimage"
            alt="product logo"
            width="300"
            height="300"
            ngSrc="{{ errorLoadingImage ? 'assets/noimage.png' : productItem.image }}"
            priority
            (error)="onError()"
          />
        </div>
        <div class="productItemContent">
          <h2 class="itemTitle">{{ productItem.name }}</h2>

          <div class="price" *ngIf="productHasDiscountPercent(); else noDiscount">
            <div class="retailPrice">RRP $\{{ productItem.price }}</div>
            <div class="discountPrice">Now $\{{ productItem.discount_price }}</div>
            <div class="discountRate">Save {{ productItem.discount_percent }}%</div>
          </div>
          <ng-template #noDiscount>
            <div class="price">
              <div class="discountPrice">$\{{ productItem.discount_price }}</div>
            </div>
          </ng-template>

          <div class="inventory">Only {{ count }} left!</div>
          <a
            href="#"
            class="buyButton"
            label="Buy"
            (click)="buyProduct($event)">
            Buy
          </a>
        </div>
      </div>
      <div class="productDescription">{{ productItem.description }}</div>

      <div class="testimonialsWrapper">
        <div class="testimonialsHeader">
          <h3>Testimonials</h3>
        </div>

        <div class="testimonialsContent">
          
          <div class="testimonialsItem" *ngFor="let testimonial of testimonials">
            <div class="testimonialItemContent">
              <div class="rating">
                {{ '★'.repeat(testimonial.rating) }}{{ '☆'.repeat(5 - testimonial.rating) }}
              </div>
              <div class="reviewerDetails">
                {{ testimonial.reviewer_name }} from {{ testimonial.reviewer_location }}
              </div>
              <div class="reviewSummary">
                {{ testimonial.summary }}
              </div>
              <div class="reviewDescription">
                {{ testimonial.description }}
              </div>
            </div>
          </div>
          <p *ngIf="testimonials.length === 0">
            No Testimonials ... yet
          </p>

        </div>
      </div>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  @Input() productId: number = -1;
  @Input() productItem: ProductItem|undefined = undefined;

  dialog = inject(MatDialog);
  productService = inject(ProductService);
  testimonialService = inject(TestimonialService);

  count = 0;
  openDialog = false;
  openSoldOutDialog = false;
  testimonials: Testimonial[] = [];

  errorLoadingImage = false;

  ngOnInit(): void {
    let testimonials: Testimonial[] = [];
    const { id, inventory_count } = this.productItem || {};

    // Ensure we are retrieving current product testimonials
    if (id) {
      if (this.productService.testimonialCache[id]) {
        if (this.productService.testimonialCache[id]) {
          this.count = inventory_count!;
          this.testimonials = this.productService.testimonialCache[id];
        }
      }

      this.testimonialService.getProductTestimonials(id).subscribe((testimonials: Testimonial[]) => {
        this.count = inventory_count!;
        this.testimonials = testimonials;
        this.productService.testimonialCache[id] = testimonials;
      });
    } else {
      this.count = inventory_count!;
      this.testimonials = testimonials;
    }
  }

  productHasDiscountPercent(): boolean {
    return this.productItem!.discount_percent > 0
  }

  onError(): void {
    this.errorLoadingImage = true;
  }

  buyProduct(event: MouseEvent): void {
    event.preventDefault();
    if (this.count > 0 && this.productItem?.id !== undefined) {
      this.productService.buyProduct(this.productItem.id).subscribe(() => {
        this.count--;
        this.dialog.open(BuyDialogComponent, { 
          maxWidth: 'min(80vw, 560px)',
          data: { name: this.productItem!.name },
          panelClass: 'avocano-panel',
          autoFocus: false,
        });
      });
    } else {
      this.dialog.open(SoldOutDialogComponent, {
        maxWidth: 'min(80vw, 560px)',
        panelClass: 'avocano-panel',
        autoFocus: false,
      });
    }
  }
}

interface DialogData {
  name: string;
}

@Component({
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  standalone: true,
  styles: [
    `
    .dialogWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    img.oopsAvocado {
      width: auto;
      height: 200px;
      padding: 10px;
    }

    mat-dialog-actions {
      button {
        font-weight: 400;
        letter-spacing: 3px;
      }
    }
    `
  ],
  template: `
    <mat-dialog-content>
      <div class="dialogWrapper">
        <img class="oopsAvocado" src="assets/oops-avocado.png" />
        <div>
          <h2>Oops!</h2>
          <div>Sorry! This is not a real product.</div>
          <div>
            <br />
            There isn't such thing as a {{ name }}, at least in this
            storefront. But thank you for your interest in this
            product!
          </div>
        </div>
      </div>
    </mat-dialog-content>
    
  <mat-dialog-actions align="end">
    <button mat-button color="primary" mat-dialog-close>
      OH NO! 😭
    </button>
  </mat-dialog-actions>
  `
})
export class BuyDialogComponent {
  name = (inject(MAT_DIALOG_DATA) as DialogData).name;
}

@Component({
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  standalone: true,
  styles: [
    `
    .dialogWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    mat-dialog-actions {
      button {
        font-weight: 400;
        letter-spacing: 3px;
      }
    }
    `
  ],
  template: `

  <mat-dialog-content>
    <div class="dialogWrapper">
      <div>
        <h2>Sold out!</h2>
        <div>This is product is no longer available.</div>
        <div>
          Lucas ipsum dolor sit amet solo sidious hutt jade wampa
          darth leia yavin vader tatooine. Jawa yoda amidala wedge
          chewbacca. Qui-gon jinn qui-gon hutt yavin mon solo anakin
          hutt. Darth darth organa luke. Leia c-3po calamari lando
          boba palpatine mandalore boba.
        </div>
      </div>
    </div>
  </mat-dialog-content>

  <mat-dialog-actions align="end">
    <button mat-button color="primary" mat-dialog-close>
      CLOSE
    </button>
  </mat-dialog-actions>

  `
})
export class SoldOutDialogComponent {}