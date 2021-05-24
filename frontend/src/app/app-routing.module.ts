import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RequestResetComponent} from './auth/password/request-reset/request-reset.component';
import {ResponseResetComponent} from './auth/password/response-reset/response-reset.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FullLayoutComponent} from './theme/containers/full-layout/full-layout.component';
import {SimpleLayoutComponent} from './theme/containers/simple-layout/simple-layout.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {BeforeLoginService} from './auth/before-login.service';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    canActivate: [BeforeLoginService],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'request-password-reset',
        component: RequestResetComponent,
      },
      {
        path: 'response-password-reset',
        component: ResponseResetComponent,
      },
    ],
  },
  // otherwise redirect to home
  // {path: '**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
