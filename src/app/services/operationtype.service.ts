import {Inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {IApiResponse} from "../interfaces/api-responses";
import {IOperationType} from "../interfaces/operation-type";

@Injectable({
  providedIn: 'root'
})
export class OperationTypeService {

  constructor(
    private api: ApiService,
    @Inject('ApiBaseUrl') private apiBaseUrl: string) { }


  async getAll(): Promise<IOperationType[]> {
    return this.api.get<IOperationType[]>(this.apiBaseUrl + '/api/operationtype');
  }

  async create(entry: IOperationType): Promise<IOperationType> {
    return this.api.post<IOperationType>(this.apiBaseUrl + '/api/operationtype/', entry);
  }

  async get(id: number): Promise<IOperationType> {
    return this.api.get<IOperationType>(this.apiBaseUrl + '/api/operationtype/' + id);
  }

  async update(entry: IOperationType): Promise<IOperationType> {
    return this.api.patch<IOperationType>(this.apiBaseUrl + '/api/operationtype/' + entry.id, entry);
  }

  async destroy(entry: IOperationType): Promise<IApiResponse> {
    return this.api.delete<IApiResponse>(this.apiBaseUrl + '/api/operationtype/' + entry.id);
  }
}
