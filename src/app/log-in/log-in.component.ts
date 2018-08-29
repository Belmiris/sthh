import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabasesService } from 'src/app/services/databases.service';
import { SettingsService } from 'src/app/services/settings.service';
import { AuthData } from 'src/app/models/auth-data.model';
import { NameValue } from 'src/app/models/name-value.model';
import { Settings } from 'src/app/models/settings.model';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  authData = new AuthData(null, null, null, null, null, null);
  databases : NameValue[];
  errors : NameValue[];
  httpError : any;
  result : string;

  constructor(
    private settingsSvc : SettingsService, 
    private dbService : DatabasesService,
    private authSvc : AuthService,
    private errSvc: ErrorService,
    private router: Router) { 
  }

  ngOnInit() {
    // General errors
    this.errSvc.errorAny.subscribe(
      (ae: any) => {
        this.httpError = ae;
        console.log('got a general error');
      }
    );

    // Named errors
    this.errSvc.errorNames.subscribe(
      (ne: NameValue[]) => {
        this.errors = ne;
        console.log('got named errors');
      }
    );

    // prepare the 'listeners' before calling the service.
    this.dbService.loaded.subscribe(
      (d: NameValue[]) => {
        this.databases = d;
        console.log('we got our databases');
      }
    );

    // listen to the settings last. 
    // When we get them, call for what we need from the server.
    this.settingsSvc.settingsLoaded.subscribe(
      (s: Settings) => {
        this.dbService.load();
      }
    );

    this.authSvc.loaded.subscribe(
      (a: AuthData) => {
        console.log('received authorization');
        this.result = "Logged in successfully";
        // We want to move (route) to the main screen here.
        this.router.navigate(['/main']);
      }
    );

    // Finally, load our settings.
    this.settingsSvc.loadSettings();
  }

  postAuthData() {
    this.authSvc.post(this.authData);
  }
}
