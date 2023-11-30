import { OnInit, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginAuthService } from '../login-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './loginCheckbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit{
  blackThemeOn: boolean = false;
  bigSizeOn: boolean = false;
  showingPassword: boolean = false;

  validAccount: boolean = true;

  isShowingPass: boolean = false;
  passwordPath: string = '../../assets/Images/eye.png';
  passwordType: string = 'password';

  loginForm!: FormGroup;

  actualTryLogin!: boolean;

  constructor(
    private authService: LoginAuthService,
    private router: Router
    ){

  }

  ngOnInit(): void{
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  public changeTypePass(){
    if (this.showingPassword == false ){
      this.showingPassword = true;
      this.passwordPath = '../../assets/Images/hiddenEye.png';

      this.passwordType = 'text';
    }
    else if (this.showingPassword == true ){
      this.showingPassword = false;
      this.passwordPath = '../../assets/Images/eye.png';

      this.passwordType = 'password';
    }
  }

  onSubmitLogin(){
    this.validAccount = true;
    if(this.loginForm.invalid) {
      return;
    }

    console.log("Método Submit Chamado!");

    this.actualTryLogin = this.authService.receiveLog(this.loginForm.value);

    if(this.actualTryLogin){
      this.router.navigate(['/myprofile']);
    }
    else{
      this.validAccount = false;
    }
  }
}
