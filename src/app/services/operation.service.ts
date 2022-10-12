import {Inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {IApiResponse} from "../interfaces/api-responses";
import {IOperation} from "../interfaces/operation";

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(
    private api: ApiService,
    @Inject('ApiBaseUrl') private apiBaseUrl: string) { }


  async getAll(): Promise<IOperation[]> {
    return this.api.get<IOperation[]>(this.apiBaseUrl + '/api/operation');
  }

  async create(entry: IOperation): Promise<IOperation> {
    return this.api.post<IOperation>(this.apiBaseUrl + '/api/operation/', entry);
  }

  async get(id: number): Promise<IOperation> {
    return this.api.get<IOperation>(this.apiBaseUrl + '/api/operation/' + id);
  }

  async update(entry: IOperation): Promise<IOperation> {
    return this.api.patch<IOperation>(this.apiBaseUrl + '/api/operation/' + entry.id, entry);
  }

  async destroy(entry: IOperation): Promise<IApiResponse> {
    return this.api.delete<IApiResponse>(this.apiBaseUrl + '/api/operation/' + entry.id);
  }
}
