import {Inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {IApiResponse} from "../interfaces/api-responses";
import {
  IOperation,
  IOperationCreateRequest,
  IOperationGetAllOptions,
  IOperationUpdateRequest
} from "../interfaces/operation";

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(
    private api: ApiService,
    @Inject('ApiBaseUrl') private apiBaseUrl: string) { }

  async getAll(factionId: number, options: IOperationGetAllOptions): Promise<IOperation[]> {
    return this.api.getWithParams<IOperation[]>(this.apiBaseUrl + '/api/operation/all/' + factionId, options);
  }

  async create(entry: IOperationCreateRequest): Promise<IOperation> {
    return this.api.post<IOperation>(this.apiBaseUrl + '/api/operation/', entry);
  }

  async get(id: number): Promise<IOperation> {
    return this.api.get<IOperation>(this.apiBaseUrl + '/api/operation/' + id);
  }

  async update(id: number, entry: IOperationUpdateRequest): Promise<IOperation> {
    return this.api.patch<IOperation>(this.apiBaseUrl + '/api/operation/' + id, entry);
  }

  async destroy(entry: IOperation): Promise<IApiResponse> {
    return this.api.delete<IApiResponse>(this.apiBaseUrl + '/api/operation/' + entry.id);
  }

  async toggleUser(entry: IOperation, userId: number, status: boolean) {
    return this.api.post<IApiResponse>(this.apiBaseUrl + '/api/operation/toggleUser/' + entry.id, {
      userId,
      action: status
    });
  }
}
