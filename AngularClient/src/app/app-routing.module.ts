import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';

const routes: Routes = [
  {path:'',component: HomeComponent, canActivate:[AuthGuard]},
  {path:'admin',component: AdminComponent, canActivate:[AuthGuard],
                                           data:{roles:[Role.Admin]}
  },
  {path:'login',component: LoginComponent},
  // otherwise redirect to home
  {path:'**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
