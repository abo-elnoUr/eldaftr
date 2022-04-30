import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { OtherComponent } from './shared/components/other/other.component';
import { OutgoingComponent } from './shared/components/outgoing/outgoing.component';
import { ReceivedComponent } from './shared/components/received/received.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { SettingComponent } from './shared/components/setting/setting.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'outgoing', component: OutgoingComponent, canActivate: [AuthGuard] },
  { path: 'received', component: ReceivedComponent, canActivate: [AuthGuard] },
  { path: 'other', component: OtherComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: SettingComponent, canActivate: [AuthGuard] },
  // { path: '**', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
