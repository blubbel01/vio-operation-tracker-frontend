import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IApiAuthResponse, IJWTToken} from "../interfaces/api-responses";
import jwtDecode from "jwt-decode";
import {EPermission} from "../enums/permission";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject('ApiBaseUrl') private apiBaseUrl: string) {
  }

  login(userName: string, password: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.post<IApiAuthResponse | null>(this.apiBaseUrl + '/api/auth/login', {
        userName,
        password
      }, {}).subscribe(res => {
        console.log(res);
        if (res?.token != null) {
          localStorage.setItem('token', res.token);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getTokenData(): IJWTToken | null {
    const token = localStorage.getItem('token');
    if (token == null) return null;
    return <IJWTToken>jwtDecode(token);
  }

  isAdmin(): boolean {
    const data = this.getTokenData();
    if (data == null) return false;
    return (data.isAdmin && data.faction == null);
  }

  hasPermission(permission: Array<EPermission>): boolean {
    const user = this.getTokenData();
    if (user == null) return false;

    if (user.isAdmin) return true;
    if (user.role == null) return false;

    const binaryAccess = user.role.accessLevel.toString(2);
    return permission.some(perm => binaryAccess.charAt(perm) == '1');
  }

  isLoggedIn(): boolean {
    return this.getTokenData() != null;
  }

  isLoggedOut(): boolean {
    return this.getTokenData() == null;
  }

  getOwnUserId(): number {
    return this.getTokenData()!.id;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getAuthHeader() {
    return new HttpHeaders().set('AuthorizationToken', <string>this.getToken());
  }
}
