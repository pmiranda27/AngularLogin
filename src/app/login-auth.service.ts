import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  allLogins!: any;

  private tryEmail!: string;
  private tryPassword!: string;

  receiveLogin: Observable<any>;
  private sendLogin = new Subject<any>();

  constructor() { 
    this.receiveLogin = this.sendLogin.asObservable();
  }

  getUser(): string {
    return this.allLogins.name;
  }
  getEmail(): string {
    return this.allLogins.email;
  }

  receiveReg(formValue: any) {
    console.warn("REGISTRO RECEBIDO NO SERVICE!!!");

    this.allLogins = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password
    };

    console.log("IMPRIMINDO ARRAY DOS LOGINS");
    console.warn(this.allLogins);
  }

  receiveLog(formValue: any) {
    this.tryEmail = formValue.email;
    this.tryPassword = formValue.password;

    console.log("O objeto allLogins é: " + this.allLogins);
    console.log("A tentativa de e-mail atual é: " + this.tryEmail);
    console.log("A senha da conta seria: " + this.allLogins.password);

    if (this.tryEmail == this.allLogins.email) {
      if (this.tryPassword == this.allLogins.password) {
        console.warn("Login efetuado com sucesso.");
        return true;
      }
      else {
        console.warn("Senha inválida.");
        return false;
      }
    }
    else {
      console.warn("E-mail inválido.");
      return false;
    }
  }
}
