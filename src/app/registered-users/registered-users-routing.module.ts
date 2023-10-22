import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisteredUsersPage } from './registered-users.page';

const routes: Routes = [
  {
    path: '',
    component: RegisteredUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisteredUsersPageRoutingModule {}
