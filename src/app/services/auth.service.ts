import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IApiAuthResponse, IJWTToken} from "../interfaces/api-responses";
import jwtDecode from "jwt-decode";
import {EPermission} from "../enums/permission";
import {FactionService} from "./faction.service";
import {IUser} from "../interfaces/user";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private factionService: FactionService,
    private userService: UserService,
    @Inject('ApiBaseUrl') private apiBaseUrl: string) {

    const lastUserJson = localStorage.getItem('user');
    if (lastUserJson != null) {
      try {
        this.lastUser = JSON.parse(lastUserJson);
      } catch (_) {}
    }
  }

  login(userName: string, password: string, factionId?: number): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.post<IApiAuthResponse | null>(this.apiBaseUrl + '/api/auth/login', {
        userName,
        password,
        factionId,
      }, {}).subscribe(res => {
        if (res?.token != null) {
          localStorage.setItem('token', res.token);
          this.getUser();
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    delete this.lastUser;
  }

  getTokenData(): IJWTToken | null {
    const token = localStorage.getItem('token');
    if (token == null) return null;
    return <IJWTToken>jwtDecode(token);
  }

  lastUser?: IUser;

  async getUser(): Promise<IUser | null> {
    const token = this.getTokenData();
    if (!token) return null;
    const user = await this.userService.get(token.id);
    this.lastUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  getLastUser(): IUser | undefined {
    if (this.getTokenData() == null) return undefined;
    return this.lastUser;
  }

  isAdmin(): boolean {
    const data = this.getLastUser();
    if (data == null) return false;
    return (data.isAdmin && data.faction == null);
  }

  hasPermission(permission: Array<EPermission>): boolean {
    const user = this.getLastUser();
    if (user == null) return false;

    if (user.isAdmin) return true;
    if (user.role == null) return false;

    const binaryAccess = user.role.accessLevel.toString(2);
    return permission.some(perm => binaryAccess.charAt(perm) == '1');
  }

  isOwnFactionActive(): boolean {
    const user = this.getLastUser();
    if (user == null) return false;
    if (user.faction == null) return false;
    return this.factionService.isFactionActive(user.faction);
  }

  isInFaction(): boolean {
    const user = this.getLastUser();
    if (user == null) return false;
    return user.factionId != null;
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
}
