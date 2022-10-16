import {Inject, Injectable} from '@angular/core';
import {IFaction, IFactionPaymentResponse, IFactionRegisterRequest} from "../interfaces/faction";
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

  async register(data: IFactionRegisterRequest): Promise<IFaction|IApiResponse> {
    return this.api.post<IFaction>(this.apiBaseUrl + '/api/faction/', data);
  }

  async getPayment(id: number): Promise<IFactionPaymentResponse[]|IApiResponse> {
    return this.api.get<IFactionPaymentResponse[]>(this.apiBaseUrl + '/api/faction/' + id + '/getPayment');
  }

  isFactionActive(faction?: IFaction|null): boolean {
    if (faction == null) return false;
    if (faction.userLimit <= 12) return true;
    return new Date(faction.payedUntil).getTime() > Date.now();
  }
}
