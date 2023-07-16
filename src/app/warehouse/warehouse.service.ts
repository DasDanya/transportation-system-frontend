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

    public deleteWarehouseGet(id:number): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/warehouse/delete/${id}`);
    }

    public deleteWarehouse(id:number):Observable<any>{
        return this.http.delete<any>(`${this.apiServerUrl}/warehouse/delete/${id}`);
    }

    public searchWarehouses(field:string,value:string):Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/warehouse/all?field=${field}&value=${value}`);
    }

    public updateWarehouseGet(id:number):Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/warehouse/update/${id}`)
    }

    public updateWarehouse(warehouse:Warehouse):Observable<any>{
        return this.http.put(`${this.apiServerUrl}/warehouse/update`, warehouse);
    }

    public getReportExcel(id:number):Observable<any>{
        return this.http.get(`${this.apiServerUrl}/warehouse/excel/${id}`, {responseType: 'arraybuffer'});
    }
}
