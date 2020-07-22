import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }
  login = () => {
    this.loginService.login(this.email, this.password).subscribe(
    (data) => {
    if (data != null && data.email) {
    localStorage.setItem('username', data.email);
    localStorage.setItem('password', data.password);
    console.log('login Success');
    this.router.navigateByUrl('/');
    } else{
    console.log('login fail');
    }
    },
    (err) => console.error(err)
    );
  }
  ngOnInit(): void {
  }

}
