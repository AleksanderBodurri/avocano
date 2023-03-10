import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-contact',
  styles: [
    `
    h1 {
      color: var(--color-secondary);
    }
  
    .contactContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 20px;
    }
    `
  ],
  template: `
  <div class="contactContainer">
    <h1>Contact</h1>
    <div class="contactWrapper">
      This website was deployed from sample code in the
      <a href="https://github.com/aleksanderbodurri/avocano"
        >aleksanderbodurri/avocano</a
      >
      repo on GitHub.
    </div>
  </div>
  `
})
export class ContactComponent { }