import { Component } from '@angular/core';

import { ViewEncapsulation, OnInit } from '@angular/core';

import { LoginAuthService } from '../login-auth.service';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MyprofileComponent implements OnInit{
  public nomeUser!: string;
  public emailUser!: string;

  constructor( private loginAuth: LoginAuthService ){

  }

  ngOnInit() {
    this.nomeUser = this.loginAuth.getUser();
    this.emailUser = this.loginAuth.getEmail();
  }
}
