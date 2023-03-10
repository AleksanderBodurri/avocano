import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';

import { routes } from './app/routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom, InjectionToken } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const CONFIG = new InjectionToken<{ API_URL: string }>('Configuration');

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    {
      provide: CONFIG,
      useValue: { API_URL: 'https://avocano.dev/api' }
    }
]
})