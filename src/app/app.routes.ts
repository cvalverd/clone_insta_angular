import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginFormComponent } from './login-form/login-form.component';

export const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
