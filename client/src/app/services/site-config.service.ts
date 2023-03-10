import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, EMPTY, Observable } from "rxjs";
import { CONFIG } from "../../main";

export interface SiteConfig {
  active: boolean;
  color_primary: string;
  color_secondary: string;
  color_action: string;
  color_action_text: string;
  site_name: string;
  site_name_font: string;
  site_name_color: string;
  base_font: string;
}

@Injectable({ providedIn: 'root' })
export class SiteConfigService {
  config = inject(CONFIG);
  httpClient = inject(HttpClient);

  getSiteConfig(): Observable<SiteConfig> {
    const { API_URL } = this.config;

    return this.httpClient.get<SiteConfig>(`${API_URL}/active/site_config/`).pipe(catchError(error => {
      console.error(error);
      return EMPTY;
    }));
  };
}