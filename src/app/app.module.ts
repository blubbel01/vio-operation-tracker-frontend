import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {RegisterFactionComponent} from './pages/register-faction/register-faction.component';
import {FactionsComponent} from './pages/factions/factions.component';
import {SearchPipe} from './pipes/search.pipe';
import {FactionListComponent} from './pages/admin/faction-list/faction-list.component';
import {FactionEditComponent} from './pages/user/faction-edit/faction-edit.component';
import {OperationTypesEditComponent} from './pages/user/operation-types-edit/operation-types-edit.component';
import {RolesEditComponent} from './pages/user/roles-edit/roles-edit.component';
import {OperationsUserComponent} from './pages/user/operations-user/operations-user.component';
import {OperationsCreateComponent} from './pages/user/operations-create/operations-create.component';
import {PaymentListComponent} from './pages/user/payment-list/payment-list.component';
import {MemberListComponent} from './pages/user/member-list/member-list.component';
import {MemberEditComponent} from './pages/user/member-edit/member-edit.component';
import {OperationTypesListComponent} from './pages/user/operation-types-list/operation-types-list.component';
import {RolesListComponent} from './pages/user/roles-list/roles-list.component';
import {ManagementComponent} from './pages/user/management/management.component';
import {ProfileComponent} from './pages/user/profile/profile.component';
import {HttpTokenInterceptor} from "./interceptors/http-token.interceptor";
import {NgxCleaveDirectiveModule} from "ngx-cleave-directive";
import {ToggleButtonComponent} from './utils/toggle-button/toggle-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterFactionComponent,
    FactionsComponent,
    SearchPipe,
    FactionListComponent,
    FactionEditComponent,
    OperationTypesEditComponent,
    RolesEditComponent,
    OperationsUserComponent,
    OperationsCreateComponent,
    PaymentListComponent,
    MemberListComponent,
    MemberEditComponent,
    OperationTypesListComponent,
    RolesListComponent,
    ManagementComponent,
    ProfileComponent,
    ToggleButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    NgxCleaveDirectiveModule,
  ],
  providers: [
    {provide: 'ApiBaseUrl', useValue: 'http://127.0.0.1:8080'},
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
