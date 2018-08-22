import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { DatabasesService } from 'src/app/services/databases.service';
import { SettingsService } from 'src/app/services/settings.service';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { MainComponent } from './main/main.component';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'main', component: MainComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    MainComponent,
    TestComponent,
    PageNotFoundComponent
  ],
  imports: [
    Angular2FontawesomeModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    DatabasesService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
