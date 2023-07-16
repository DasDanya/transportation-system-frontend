import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageService } from "../auth/token-storage.service";


@Injectable({
    providedIn: 'root'
})
export class ResponsibleService{

    private apiServerUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient, private tokenStorage:TokenStorageService) {}

    public getResponsibles(): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/responsible/all`);
    }

    public deleteResponsibleGet(id:number){
        return this.http.get<any>(`${this.apiServerUrl}/responsible/delete/${id}`);
    }
    
    public deleteResponsible(id:number):Observable<any>{
        return this.http.delete<any>(`${this.apiServerUrl}/responsible/delete/${id}`);
    }

    public addResponsible(responsible: FormData): Observable<any>{
        return this.http.post<any>(`${this.apiServerUrl}/responsible/add`, responsible);
    }

    public updateResponsibleGet(id:number): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/responsible/update/${id}`)
    }

    public updateResponsible(responsible:FormData): Observable<any>{
        return this.http.put<any>(`${this.apiServerUrl}/responsible/update`, responsible);
    }
    
    public searchResponsibles(field:string,value:string):Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/responsible/all?field=${field}&value=${value.replace(/\+/gi, '%2B')}`);
    }

    public getReportExcel(id:number):Observable<any>{
        return this.http.get(`${this.apiServerUrl}/responsible/excel/${id}`, {responseType: 'arraybuffer'});
    }
}

