import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CargoService{
    private apiServerUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) {}

    public getAddCargo():Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/cargo/add`); 
    }

    public addCargo(cargo:FormData):Observable<any>{
        return this.http.post<any>(`${this.apiServerUrl}/cargo/add`,cargo);
    }

    public getCargos():Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/cargo/all`);
    }

    public deleteCargoGet(id:number):Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/cargo/delete/${id}`);
    }

    public deleteCargo(id:number):Observable<any>{
        return this.http.delete<any>(`${this.apiServerUrl}/cargo/delete/${id}`);
    }

    public searchCargos(field:string,value:string, conditional: string | undefined):Observable<any>{
        if(conditional === undefined){
            return this.http.get<any>(`${this.apiServerUrl}/cargo/all?field=${field}&value=${value}`);
        }else{
            return this.http.get<any>(`${this.apiServerUrl}/cargo/all?field=${field}&value=${value}&conditional=${conditional}`);
        }
    }

    public updateCargoGet(id:number):Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/cargo/update/${id}`);
    }

    public updateCargo(cargo:FormData):Observable<any>{
        return this.http.put(`${this.apiServerUrl}/cargo/update`,cargo);
    }
}