import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterFactionComponent} from "./pages/register-faction/register-faction.component";
import {FactionsComponent} from "./pages/factions/factions.component";
import {RegisterComponent} from "./pages/register/register.component";
import {IsLoggedOutGuard} from "./guards/is-logged-out.guard";
import {IsLoggedInGuard} from "./guards/is-logged-in-guard.service";
import {IsAdminGuard} from "./guards/is-admin.guard";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: 'factions',
    component: FactionsComponent,
  },
  {
    path: 'factions/:id',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [IsLoggedOutGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [IsLoggedOutGuard],
      },
      {
        path: 'list',
        component: RegisterFactionComponent,
        canActivate: [IsLoggedInGuard, IsAdminGuard],
      },
    ]
  },
  {
    path: 'register-faction',
    component: RegisterFactionComponent,
    canActivate: [IsLoggedOutGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
