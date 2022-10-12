import {Inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {IApiResponse} from "../interfaces/api-responses";
import {IUser} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
    @Inject('ApiBaseUrl') private apiBaseUrl: string) { }

  async getAllOfOwnFaction(): Promise<IUser[]> {
    return this.api.get<IUser[]>(this.apiBaseUrl + '/api/user');
  }

  async getAllOfFaction(factionId: number): Promise<IUser[]> {
    return this.api.get<IUser[]>(this.apiBaseUrl + '/api/user/' + factionId);
  }

  async create(entry: IUser): Promise<IUser> {
    return this.api.post<IUser>(this.apiBaseUrl + '/api/user/', entry);
  }

  async get(id: number): Promise<IUser> {
    return this.api.get<IUser>(this.apiBaseUrl + '/api/user/' + id);
  }

  async update(entry: IUser): Promise<IUser> {
    return this.api.patch<IUser>(this.apiBaseUrl + '/api/user/' + entry.id, entry);
  }

  async destroy(entry: IUser): Promise<IApiResponse> {
    return this.api.delete<IApiResponse>(this.apiBaseUrl + '/api/user/' + entry.id);
  }
}
