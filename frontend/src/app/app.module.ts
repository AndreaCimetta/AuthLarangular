import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RequestResetComponent } from './auth/password/request-reset/request-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResponseResetComponent } from './auth/password/response-reset/response-reset.component';
import { FullLayoutComponent } from './theme/containers/full-layout/full-layout.component';
import { SimpleLayoutComponent } from './theme/containers/simple-layout/simple-layout.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {StaffService} from './auth/staff.service';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BeforeLoginService} from './auth/before-login.service';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {StartupService} from '../shared/startup.service';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';


export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    whitelistedDomains: environment.whitelistedDomains,
    blacklistedRoutes: environment.blacklistedRoutes,
  };
}

export function startupServiceFactory(startupService: StartupService){
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RequestResetComponent,
    ProfileComponent,
    DashboardComponent,
    ResponseResetComponent,
    FullLayoutComponent,
    SimpleLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SnotifyModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        deps: [],
        useFactory: jwtOptionsFactory
      }
    }),
    ButtonModule,
    SidebarModule
  ],
  providers: [
    AuthGuardService,
    StaffService,
    BeforeLoginService,
    StartupService,
    SnotifyService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
