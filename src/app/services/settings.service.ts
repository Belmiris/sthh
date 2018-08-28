import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from 'src/app/models/auth-data.model';
import { Settings } from 'src/app/models/settings.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settingsLoaded = new EventEmitter<Settings>();
  public settings: Settings;
  public auth: AuthData;
  public token: string;

  constructor(private http: HttpClient, private router: Router) { }

  loadSettings() {
    if (this.settings == null) {
      console.log('settings was null');
      this.http.get<Settings>("./assets/settings.json")
        .subscribe( data => {
          this.settings = data;
          this.settingsLoaded.emit(this.settings);
      });
    } else {
      this.settingsLoaded.emit(this.settings);
    }
  }

  public getAuth(): AuthData {
    if (this.auth == undefined || this.auth == null) {
      console.log('Empty authorization. Go to login.');
      this.router.navigate(['/login']);
    }

    return this.auth;
  }
}
