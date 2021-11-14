import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CurrentsService {

  constructor(private http: HttpClient) {}
  
  getCurrentStates(params) {
    return this.http
      .get<any>("/api/currents", { params: params })
      .toPromise()
      .then(res =>{
        return res;
      });
  }
}
