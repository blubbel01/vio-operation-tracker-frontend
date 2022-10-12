import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterFactionComponent } from './pages/register-faction/register-faction.component';
import { FactionsComponent } from './pages/factions/factions.component';
import { SearchPipe } from './pipes/search.pipe';
import { FactionListComponent } from './pages/admin/faction-list/faction-list.component';
import { FactionEditComponent } from './pages/user/faction-edit/faction-edit.component';
import { OperationTypesEditComponent } from './pages/user/operation-types-edit/operation-types-edit.component';
import { RolesEditComponent } from './pages/user/roles-edit/roles-edit.component';
import { OperationsManageComponent } from './pages/user/operations-manage/operations-manage.component';
import { OperationsUserComponent } from './pages/user/operations-user/operations-user.component';
import { OperationsCreateComponent } from './pages/user/operations-create/operations-create.component';
import { PaymentListComponent } from './pages/user/payment-list/payment-list.component';
import { MemberListComponent } from './pages/user/member-list/member-list.component';
import { MemberEditComponent } from './pages/user/member-edit/member-edit.component';

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
    OperationsManageComponent,
    OperationsUserComponent,
    OperationsCreateComponent,
    PaymentListComponent,
    MemberListComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    {provide: 'ApiBaseUrl', useValue: 'http://localhost:8080'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
