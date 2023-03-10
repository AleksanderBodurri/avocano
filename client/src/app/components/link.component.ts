import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-link',
  styles: [
    `
    :host {
      margin: 0 10px;
    }
  
    a {
      color: black;
      text-decoration: none;
    }
    `
  ],
  template: `
    <a [routerLink]="href" (click)="onClick($event)">
      <ng-content/>
    </a>
  `
})
export class LinkComponent {
  @Input() href = '';

  router = inject(Router);

  onClick(event: MouseEvent) {
    event.preventDefault();
    this.router.navigate([this.href]);
  }
}