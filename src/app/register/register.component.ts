import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginAuthService } from '../login-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './registerCheckbox.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  blackThemeOn: boolean = false;
  bigSizeOn: boolean = false;
  showingPassword: boolean = false;

  isShowingPass: boolean = false;
  passwordPath: string = '../../assets/Images/eye.png';
  passwordType: string = 'password';

  registerForm!: FormGroup;

  actualLogin!: any;

  constructor(private authService: LoginAuthService){
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

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  get name() {
    return this.registerForm.get('name')!;
  }
  get email() {
    return this.registerForm.get('email')!;
  }
  get password() {
    return this.registerForm.get('password')!;
  }

  onSubmit(){
    if(this.registerForm.invalid) {
      return;
    }

    console.log("Método Submit Chamado!");

    this.actualLogin = this.registerForm.value;

    this.authService.receiveReg(this.actualLogin);
  }
}
