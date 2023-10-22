import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.page.html',
  styleUrls: ['./registered-users.page.scss'],
})
export class RegisteredUsersPage implements OnInit {

  users: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.users = this.authService.getRegisteredUsers();
  }
}
