import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-shipping',
  styles: [
    `
    h1 {
      color: var(--color-secondary);
    }
  
    .shippingContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 20px;
    }
    `
  ],
  template: `
  <div class="shippingContainer">
    <h1>Shipping</h1>
    <div class="shippingWrapper">
      This website ships no products, but this website was shipped through
      Google Cloud automation.
      <a
        href="https://github.com/GoogleCloudPlatform/avocano/tree/main/docs"
        >Learn more.</a
      >
    </div>
  </div>
  `
})
export class ShippingComponent { }