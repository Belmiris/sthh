import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthData } from 'src/app/models/auth-data.model';
import { ErrorService } from './error.service';
import { NameValue } from 'src/app/models/name-value.model';
import { Router } from '@angular/router';
import { Settings } from 'src/app/models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settingsLoaded = new EventEmitter<Settings>();
  public settings: Settings;
  public auth: AuthData;
  public token: string;

  constructor(
    private errSvc: ErrorService,
    private http: HttpClient, 
    private router: Router) { }

  loadSettings() {
    if (this.settings == null) {
      console.log('settings was null');
      const url: string = "./assets/settings.json";
      this.http.get<Settings>(url)
        .subscribe( 
          data => {
            this.settings = data;
            this.settingsLoaded.emit(this.settings);
          },
          error => {
            this.handleError(error, url);
          });
    } else {
      this.settingsLoaded.emit(this.settings);
    }
  }

  private handleError(errorResponse: HttpErrorResponse, url: string) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    this.errSvc.errorAny.emit(errorResponse);

    this.errSvc.throwAny(errorResponse);
    var nv1 = new NameValue();
    nv1.Name = "Get settings failed";
    nv1.Value = url;
    let list: Array<NameValue> = [ nv1 ];
    this.errSvc.throwNamed(list);
  }

  public getAuth(): AuthData {
    if (this.auth == undefined || this.auth == null) {
      console.log('Empty authorization. Go to login.');
      this.router.navigate(['/login']);
    }

    return this.auth;
  }
}
