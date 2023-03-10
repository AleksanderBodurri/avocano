import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-not-found',
  styles: [
    `
    h1 {
      color: var(--color-secondary);
    }
  
    .notFoundContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 20px;
    }
    `
  ],
  template: `
  <div class="notFoundContainer">
    <h1>Not Found</h1>
    <div>
      Please head back to the home page by clicking
      <a href="/">this link</a>.
    </div>
  </div>
  `
})
export class NotFoundComponent { }