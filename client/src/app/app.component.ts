import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header.component';
import { SiteConfigService } from './services/site-config.service';

@Component({
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    HeaderComponent
  ],
  standalone: true,
  selector: 'app-root',
  styles: [
    `
    :host {
      font-family: sans-serif;
      font-family: var(--base-font);
      font-size: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
  
    h1 {
      font-size: 45px;
      color: purple;
    }
  
    .route {
      width: 100%;
    }

    .main-avocano-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 1080px;
    }
    `
  ],
  template: `
    <app-header [headerTitle]="headerTitle"/>
    <main class="main-avocano-content">
      <router-outlet/>
    </main>
    <app-footer/>
  `
})
export class AppComponent implements OnInit {
  siteConfigService = inject(SiteConfigService);
  elementRef = inject(ElementRef);
  headerTitle = 'Simulatum';

  ngOnInit(): void {
    this.siteConfigService.getSiteConfig().subscribe(siteConfig => {
      if (this.elementRef === undefined) {
        return;
      }

      if ((window as any).WebFont) {
        (window as any).WebFont.load({
          google: {
            families: [siteConfig.base_font, siteConfig.site_name_font],
          },
        });
      }

      const { nativeElement } = this.elementRef;
      nativeElement.style.setProperty('--color-primary', siteConfig.color_primary);
      nativeElement.style.setProperty('--color-secondary', siteConfig.color_secondary);
      nativeElement.style.setProperty('--color-action', siteConfig.color_action);
      nativeElement.style.setProperty('--color-action-text', siteConfig.color_action_text);
      nativeElement.style.setProperty('--site-name-color', siteConfig.site_name_color);
      nativeElement.style.setProperty('--site-name-font', siteConfig.site_name_font);
      nativeElement.style.setProperty('--base-font', siteConfig.base_font);

      this.headerTitle = siteConfig.site_name;
    });
  }
}
