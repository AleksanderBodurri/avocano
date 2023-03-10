import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";
import { LinkComponent } from "./link.component";

@Component({
  imports: [
    CommonModule,
    LinkComponent,
    RouterLink
  ],
  standalone: true,
  selector: 'app-header',
  styles: [
    `
      :host {
        font-family: var(--base-font), sans-serif;
        width: 100%;
      }
    
      .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-left: 2em;
        background-color: var(--color-primary);
        background-image: linear-gradient(to right, white, var(--color-primary));
      }
    
      h1 {
        font-family: var(--site-name-font), cursive;
        font-size: 45px;
      }
      h1 > a {
        color: var(--site-name-color) !important;
      }
    
      .header > h1 > a {
        text-decoration: none;
      }
    
      .header > h1 > a:active {
        text-decoration: underline;
      }
    
      .navigation-bar {
        display: flex;
        align-items: flex-end;
        width: inherit;
        margin-bottom: 20px;
      }
    `
  ],
  template: `
  <div class="header">
    <h1><a [routerLink]="['/']">{{ headerTitle }}</a></h1>
    <div class="navigation-bar">
      <app-link href="/products">Products</app-link>
      <app-link href="/shipping">Shipping</app-link>
      <app-link href="/contact">Contact</app-link>
    </div>
  </div>
  `
})
export class HeaderComponent {
  @Input() set headerTitle(title: string) {
    this.title.setTitle(title);
    this._headerTitle = title;
  }

  get headerTitle(): string {
    return this._headerTitle;
  }

  title = inject(Title);

  private _headerTitle = 'Simulatum';
}