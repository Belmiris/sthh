import { Injectable, EventEmitter } from '@angular/core';
import { DatabaseDTO } from 'src/app/dtos/database.dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NameValue } from 'src/app/models/name-value.model';
import { SettingsService } from './settings.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class DatabasesService {
  loaded = new EventEmitter<NameValue[]>();
  public databases : NameValue[];

  constructor(
    private errSvc: ErrorService,
    private http: HttpClient,
    private settingSvc: SettingsService) { }

  load() {
    if (this.databases == null) {
      if (this.settingSvc.settings == null) {
        console.log('Cannot get databases: settings were not loaded!');
        var nv1 = new NameValue();
        nv1.Name = "*";
        nv1.Value = "Cannot get databases: settings were not loaded!";
        let list: Array<NameValue> = [ nv1 ];
        this.errSvc.throwNamed(list);
      } else {
        const url: string = this.settingSvc.settings.DataUrl + '/api/databases';
        console.log(url);
        this.http.get<DatabaseDTO>(url)
          .subscribe( 
            data => {
              this.databases = data.Values;
              this.loaded.emit(this.databases);
            },
            error => {
              this.handleError(error, url);
            }
          );
      }
    }
    else {
      this.loaded.emit(this.databases);
    }
  }

  private handleError(errorResponse: HttpErrorResponse, url: string) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    this.errSvc.throwAny(errorResponse);
    var nv1 = new NameValue();
    nv1.Name = "Get databases failed";
    nv1.Value = url;
    let list: Array<NameValue> = [ nv1 ];
    this.errSvc.throwNamed(list);
  }
}
