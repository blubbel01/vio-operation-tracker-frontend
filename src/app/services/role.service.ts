import {Inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {IApiResponse} from "../interfaces/api-responses";
import {IRole, IRoleCreateRequest} from "../interfaces/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private api: ApiService,
    @Inject('ApiBaseUrl') private apiBaseUrl: string) { }


  async getAll(factionId: number): Promise<IRole[]> {
    return this.api.get<IRole[]>(this.apiBaseUrl + '/api/role/all/' + factionId);
  }

  async create(entry: IRoleCreateRequest): Promise<IRole> {
    return this.api.post<IRole>(this.apiBaseUrl + '/api/role/', entry);
  }

  async get(id: number): Promise<IRole> {
    return this.api.get<IRole>(this.apiBaseUrl + '/api/role/' + id);
  }

  async update(entry: IRole): Promise<IRole> {
    return this.api.patch<IRole>(this.apiBaseUrl + '/api/role/' + entry.id, entry);
  }

  async destroy(entry: IRole): Promise<IApiResponse> {
    return this.api.delete<IApiResponse>(this.apiBaseUrl + '/api/role/' + entry.id);
  }
}
