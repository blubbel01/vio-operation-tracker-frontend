import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T>(uri: string): Promise<T> {
    return new Promise<T>(res => {
      this.http.get<T>(uri).subscribe((data) => {
        res(data);
      })
    });
  }

  post<T>(uri: string, body: any): Promise<T> {
    return new Promise<T>(res => {
      this.http.post<T>(uri, body).subscribe((data) => {
        res(data);
      })
    });
  }

  put<T>(uri: string, body: any): Promise<T> {
    return new Promise<T>(res => {
      this.http.put<T>(uri, body).subscribe((data) => {
        res(data);
      })
    });
  }

  patch<T>(uri: string, data: any): Promise<T> {
    return new Promise<T>(res => {
      this.http.patch<T>(uri, data).subscribe((data) => {
        res(data);
      })
    });
  }

  delete<T>(uri: string): Promise<T> {
    return new Promise<T>(res => {
      this.http.delete<T>(uri).subscribe((data) => {
        res(data);
      })
    });
  }
}
