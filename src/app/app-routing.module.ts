import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterFactionComponent} from "./pages/register-faction/register-faction.component";
import {FactionsComponent} from "./pages/factions/factions.component";
import {RegisterComponent} from "./pages/register/register.component";
import {IsLoggedOutGuard} from "./guards/is-logged-out.guard";
import {IsLoggedInGuard} from "./guards/is-logged-in-guard.service";
import {IsAdminGuard} from "./guards/is-admin.guard";
import {MemberListComponent} from "./pages/user/member-list/member-list.component";
import {FactionEditComponent} from "./pages/user/faction-edit/faction-edit.component";
import {RolesEditComponent} from "./pages/user/roles-edit/roles-edit.component";
import {OperationTypesEditComponent} from "./pages/user/operation-types-edit/operation-types-edit.component";
import {OperationTypesListComponent} from "./pages/user/operation-types-list/operation-types-list.component";
import {FactionListComponent} from "./pages/admin/faction-list/faction-list.component";
import {HasPermissionGuard} from "./guards/has-permission.guard";
import {EPermission} from "./enums/permission";
import {PaymentListComponent} from "./pages/user/payment-list/payment-list.component";
import {RolesListComponent} from "./pages/user/roles-list/roles-list.component";
import {MemberEditComponent} from "./pages/user/member-edit/member-edit.component";
import {OperationsUserComponent} from "./pages/user/operations-user/operations-user.component";
import {OperationsCreateComponent} from "./pages/user/operations-create/operations-create.component";
import {ManagementComponent} from "./pages/user/management/management.component";
import {ProfileComponent} from "./pages/user/profile/profile.component";
import {IsInFactionGuard} from "./guards/is-in-faction.guard";


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
      }
    ]
  },
  {
    path: 'register-faction',
    component: RegisterFactionComponent,
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: 'admin',
    canActivate: [IsLoggedInGuard, IsAdminGuard],
    children: [
      {
        path: 'factions',
        component: FactionListComponent,
      },
      {
        path: 'factions/:id',
        component: FactionEditComponent,
      },
      {
        path: 'factions/:id/members',
        component: MemberListComponent,
      }
    ]
  },
  {
    path: 'management',
    canActivate: [IsLoggedInGuard, HasPermissionGuard, IsInFactionGuard],
    data: {
      permissions: [EPermission.MANAGE_FACTION, EPermission.MANAGE_OPERATION_TYPES, EPermission.MANAGE_ROLES, EPermission.MANAGE_USER, EPermission.MANAGE_OPERATIONS]
    },
    component: ManagementComponent,
  },
  {
    path: 'management',
    canActivate: [IsLoggedInGuard, HasPermissionGuard, IsInFactionGuard],
    data: {
      permissions: [EPermission.MANAGE_FACTION, EPermission.MANAGE_OPERATION_TYPES, EPermission.MANAGE_ROLES, EPermission.MANAGE_USER, EPermission.MANAGE_OPERATIONS]
    },
    children: [
      {
        path: 'faction',
        data: {
          permissions: [EPermission.MANAGE_FACTION]
        },
        component: FactionEditComponent
      },
      {
        path: 'roles',
        data: {
          permissions: [EPermission.MANAGE_ROLES]
        },
        component: RolesListComponent
      },
      {
        path: 'roles/:id',
        data: {
          permissions: [EPermission.MANAGE_ROLES]
        },
        component: RolesEditComponent
      },
      {
        path: 'members',
        data: {
          permissions: [EPermission.MANAGE_USER]
        },
        component: MemberListComponent
      },
      {
        path: 'members/:id',
        data: {
          permissions: [EPermission.MANAGE_USER]
        },
        component: MemberEditComponent
      },
      {
        path: 'operation-types',
        data: {
          permissions: [EPermission.MANAGE_OPERATION_TYPES]
        },
        component: OperationTypesListComponent
      },
      {
        path: 'operation-types/:id',
        data: {
          permissions: [EPermission.MANAGE_OPERATION_TYPES]
        },
        component: OperationTypesEditComponent
      },
    ]
  },
  {
    path: 'operations',
    canActivate: [IsLoggedInGuard, HasPermissionGuard, IsInFactionGuard],
    data: {
      permissions: [EPermission.MANAGE_OPERATION_TYPES, EPermission.ADD_OPERATIONS, EPermission.PARTICIPATE_OPERATION]
    },
    component: OperationsUserComponent,
  },
  {
    path: 'operations/create',
    data: {
      permissions: [EPermission.MANAGE_OPERATION_TYPES, EPermission.ADD_OPERATIONS]
    },
    component: OperationsCreateComponent
  },
  {
    path: 'payment',
    canActivate: [IsLoggedInGuard, HasPermissionGuard, IsInFactionGuard],
    data: {
      permissions: [EPermission.PARTICIPATE_OPERATION]
    },
    component: PaymentListComponent
  },
  {
    path: 'me',
    canActivate: [IsLoggedInGuard],
    component: ProfileComponent
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
