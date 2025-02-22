import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BootstrapModule } from '../../bootstrap.module';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [CommonModule, BootstrapModule],
})
export class NavBarComponent implements OnInit {
  loggedInUser: string;
  constructor(private alertify: AlertifyService, public router: Router) {}

  ngOnInit() {}

  loggedIn() {
    this.loggedInUser = localStorage.getItem('userName') || '';
    return this.loggedInUser;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.alertify.success('Logout succes');
  }
  @Input() isTransparent: boolean = false;
}
