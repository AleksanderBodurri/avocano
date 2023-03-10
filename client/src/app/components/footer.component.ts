import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-footer',
  styles: [
    `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      padding: 30px 0;
    }
    `
  ],
  template: `
  <div class="footer">
    Made with 💚 from the
    <a href="https://github.com/GoogleCloudPlatform/avocano/">Pit Crew</a> 
    and the 
    <a href="https://github.com/angular">Angular Team</a> ❤️
  </div>
  `
})
export class FooterComponent { }