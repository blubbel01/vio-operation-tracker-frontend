import {Inject, Injectable} from '@angular/core';
import {IFaction, IFactionRegisterRequest} from "../interfaces/faction";
import {ApiService} from "./api.service";
import {IApiResponse} from "../interfaces/api-responses";

@Injectable({
  providedIn: 'root'
})
export class FactionService {

  constructor(
    private api: ApiService,
    @Inject('ApiBaseUrl') private apiBaseUrl: string) { }

  async getAll(): Promise<IFaction[]> {
    return this.api.get<IFaction[]>(this.apiBaseUrl + '/api/faction');
  }

  async get(id: number): Promise<IFaction> {
    return this.api.get<IFaction>(this.apiBaseUrl + '/api/faction/' + id);
  }

  async update(entry: IFaction): Promise<IFaction> {
    return this.api.patch<IFaction>(this.apiBaseUrl + '/api/faction/' + entry.id, entry);
  }

  async destroy(entry: IFaction): Promise<IApiResponse> {
    return this.api.delete<IApiResponse>(this.apiBaseUrl + '/api/faction/' + entry.id);
  }

  async register(data: IFactionRegisterRequest): Promise<IFaction> {
    return this.api.post<IFaction>(this.apiBaseUrl + '/api/faction/', data);
  }
}
