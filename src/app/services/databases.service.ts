import { Injectable, EventEmitter } from '@angular/core';
import { DatabaseDTO } from 'src/app/dtos/database.dto';
import { HttpClient } from '@angular/common/http';
import { NameValue } from 'src/app/models/name-value.model';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class DatabasesService {
  loaded = new EventEmitter<NameValue[]>();
  public databases : NameValue[];

  constructor(
    private http: HttpClient,
    private settingSvc: SettingsService) { }

  load() {
    if (this.databases == null) {
      if (this.settingSvc.settings == null) {
        console.log('Cannot get databases: settings were not loaded!');
      } else {
        console.log(this.settingSvc.settings.DataUrl + '/api/databases');
        this.http.get<DatabaseDTO>(this.settingSvc.settings.DataUrl + '/api/databases')
          .subscribe( data => {
            this.databases = data.Values;
            this.loaded.emit(this.databases);
          })
      }
    }
    else {
      this.loaded.emit(this.databases);
    }
  }
}
