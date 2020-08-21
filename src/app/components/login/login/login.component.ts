import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageError: string;

  constructor(public authService: AuthService) {
    this.messageError = '';
   }

  ngOnInit(): void {
  }

  login(username: string, password: string):boolean{
    this.messageError = '';
    if(!this.authService.login(username,password)){ //Login sincronicó
      this.messageError = 'Incorrect Login';
      setTimeout(function(){
        this.messageError = '';
      }.bind(this), 2500); //Luego de 2seg limpiamos el error
    }
    return false; //funcion correspondiente a un click()
  }

  logout():boolean{
    this.authService.logout();
    return false;
  }

}
