import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { AuthData } from 'src/app/models/auth-data.model';
import { AuthDataDTO } from 'src/app/dtos/auth-data.dto';
import { NameValue } from '../models/name-value.model';
//import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loaded = new EventEmitter<AuthData>();
  error = new EventEmitter<NameValue[]>();
  httpError = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private settingsSvc: SettingsService) { }

  public post(authData: AuthData) {
    const dto = new AuthDataDTO;
    dto.AuthToken = '';
    dto.AuthData = authData;
    console.log(dto);
    console.log(this.settingsSvc.settings.DataUrl + '/api/authorization');
    this.http.post<AuthDataDTO>(this.settingsSvc.settings.DataUrl + '/api/authorization', dto)
      .subscribe( 
        data => {
          if (!Array.isArray(data.Errors) || !data.Errors.length) {
            const a : AuthData = data.AuthData;
            this.settingsSvc.auth = a;
            this.settingsSvc.token = data.AuthToken;
            this.loaded.emit(a);
          } else {
            this.error.emit(data.Errors);
          }},
        error => { 
          this.handleError(error); 
        }
      );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    this.httpError.emit(errorResponse);
  }
}
