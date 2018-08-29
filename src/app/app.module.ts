import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { DatabasesService } from 'src/app/services/databases.service';
import { ErrorService } from './services/error.service';
import { SettingsService } from 'src/app/services/settings.service';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestComponent } from './test/test.component';
import { ItemLookupComponent } from './item-lookup/item-lookup.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';

const appRoutes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'main', component: MainComponent },
  { path: 'itemlookup', component: ItemLookupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    MainComponent,
    TestComponent,
    PageNotFoundComponent,
    ItemLookupComponent,
    NavbarTopComponent
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
    SettingsService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
