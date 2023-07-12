import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Warehouse } from "./warehouse";


@Injectable({
    providedIn: 'root'
})
export class WarehouseService{

    private apiServerUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) {}

    public addWarehouseGet():Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/warehouse/add`);
    }

    public addWarehouse(warehouse:Warehouse): Observable<any>{
        return this.http.post<any>(`${this.apiServerUrl}/warehouse/add`, warehouse);
    }

    public getWarehouses():Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/warehouse/all`);
    } 
}