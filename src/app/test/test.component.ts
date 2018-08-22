import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { CommonService } from 'src/app/services/common.service';
import { NameValue } from 'src/app/models/name-value.model';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/settings.model';
import { AuthData } from 'src/app/models/auth-data.model';
//import { Observable, throwError } from '../../node_modules/rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  readonly ROOT_URL = 'http://localhost:44535';
  title = 'app';
  //authData = new AuthData('Sid', 'XXX', 'bfsf', -1, undefined);
  authData = new AuthData('Rocket', 'Racoon', null, null, null, null);
  databasesObj: any;
  databases: NameValue[];
  settingsObj: any;
  settings: Settings;
  dbList: string[] = new Array ('aoc', 'bfsf');
  newPost: Observable<any>;

  constructor(
    private http: HttpClient, 
    //private commonSvc: CommonService,
    private settingSvc: SettingsService) {
    }

  ngOnInit() {
    // prepare the 'listener' before calling the service.
    // this.commonSvc.databasesLoaded.subscribe(
    //   (d: NameValue[]) => {
    //     this.databases = d;
    //   }
    // );

    this.settingSvc.settingsLoaded.subscribe(
      (s: Settings) => {
        this.settings = s;
        // we need the DataUrl from settings before we can call the web service.
        //this.getDatabasesService(); 
      }
    );
    this.getSettings();
  }

  getSettings() {
    this.http.get("./assets/settings.json")
      .subscribe( data => {
        this.settingsObj = data;
      });
  }

  getSettingsService() {
    console.log(this.settings);
    this.settingSvc.loadSettings();
  }

  getDatabases() {
    this.http.get(this.ROOT_URL + '/api/Database')
      .subscribe( data => {
        this.databasesObj = data;
      });
  }

  // getDatabasesService() {
  //   console.log(this.databases);
  //   this.commonSvc.loadDatabases();
  // }

  postAuthData() {
    // const data = {
    //   UserName: 'AAA',
    //   Password: 'BBB',
    //   Database: "CCC",
    //   ProfitCenter: -1,
    //   StoreDate: undefined
    // }

    // this.newPost = this.http.post(this.ROOT_URL + "/api/Authorization", data);

    this.newPost = this.http.post<AuthData>(this.ROOT_URL + "/api/Authorization", this.authData)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
