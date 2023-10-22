import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.page.html',
  styleUrls: ['./registered-users.page.scss'],
})
export class RegisteredUsersPage implements OnInit {

  users: any[] = [];

  constructor(private authService: AuthService,
    private router:Router,
    private location:Location) { }

  ngOnInit() {
    this.users = this.authService.getRegisteredUsers();
  }
  navigateToHome() {
    this.router.navigate(['/home']); 
  }
  navigateBack() {
   this.location.back(); 
  }
}
