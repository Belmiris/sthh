import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { AuthData } from 'src/app/models/auth-data.model';
import { AuthDataDTO } from 'src/app/dtos/auth-data.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loaded = new EventEmitter<AuthData>();

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
      .subscribe( data => {
        const a : AuthData = data.AuthData;
        this.settingsSvc.auth = a;
        console.log(this.settingsSvc.auth);
        this.settingsSvc.token = data.AuthToken;
        console.log(this.settingsSvc.token);
        this.loaded.emit(a);
      });
  }
}
