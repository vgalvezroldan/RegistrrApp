import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisteredUsersPageRoutingModule } from './registered-users-routing.module';

import { RegisteredUsersPage } from './registered-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisteredUsersPageRoutingModule
  ],
  declarations: [RegisteredUsersPage]
})
export class RegisteredUsersPageModule {}
