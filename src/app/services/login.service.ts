import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../common/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private urlAPI = 'http://localhost:8080/api/v1/user';
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login = (email: string, password: string) => {
    console.log(email);
    console.log(password);
    const loginUrl = `${this.urlAPI}/signin`;
    console.log(loginUrl);
    return this.http
      .post<any>(loginUrl, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // console.log(user);
          if (user != null) {
            const newUser = {} as User;
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.firstName = user.firstName;
            newUser.lastName = user.lastName;
            newUser.address = user.address;
            newUser.password = user.password;
            newUser.phone = user.phone;
            newUser.roles = user.roles;
            this.currentUserSubject.next(newUser);
            return user;
          } else {
            return null;
          }
        })
      );
  }

  public logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.currentUserSubject.next(null);
  }
}
