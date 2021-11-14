import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  constructor(private http: HttpClient) {}
  
  getInvoiceStatesHistory(params) {
    return this.http
      .get<any>("/api/all", { params: params })
      .toPromise()
      .then(res =>{
        return res;
      });
  }

  getUniquesDatesTime(params) {
    return this.http
      .get<any>("api/allDatetime", { params: params })
      .toPromise()
      .then(res =>{
        return res;
      });
  }

}
