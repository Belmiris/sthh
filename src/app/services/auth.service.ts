import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { AuthData } from 'src/app/models/auth-data.model';
import { AuthDataDTO } from 'src/app/dtos/auth-data.dto';
import { NameValue } from '../models/name-value.model';
import { ErrorService } from './error.service';
//import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loaded = new EventEmitter<AuthData>();

  constructor(
    private errSvc: ErrorService,
    private http: HttpClient,
    private settingsSvc: SettingsService) { }

  public post(authData: AuthData) {
    const dto = new AuthDataDTO;
    dto.AuthToken = '';
    dto.AuthData = authData;
    //console.log(dto);
    //console.log(this.settingsSvc.settings.DataUrl + '/api/authorization');
    const url = this.settingsSvc.settings.DataUrl + '/api/authorization';
    this.http.post<AuthDataDTO>(url, dto)
      .subscribe( 
        data => {
          if (!Array.isArray(data.Errors) || !data.Errors.length) {
            const a : AuthData = data.AuthData;
            this.settingsSvc.auth = a;
            this.settingsSvc.token = data.AuthToken;
            this.loaded.emit(a);
          } else {
            this.errSvc.errorNames.emit(data.Errors);
          }},
        error => { 
          this.handleError(error, url);
        }
      );
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
    nv1.Name = "Get authorization failed";
    nv1.Value = url;
    let list: Array<NameValue> = [ nv1 ];
    this.errSvc.throwNamed(list);
  }
}
