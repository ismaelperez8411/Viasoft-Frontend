import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AvilablilityService {

  constructor(private http: HttpClient) {}
  
  getStatesAvailbility(params) {
    return this.http
      .get<any>("/api/availability", { params: params })
      .toPromise()
      .then(res =>{
        return res;
      });
  }
}
