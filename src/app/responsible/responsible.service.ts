import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };

@Injectable({
    providedIn: 'root'
})
export class ResponsibleService{

    
    private apiServerUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) {}

    public getResponsibles(): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/responsible/all`);
    }

    public deleteResponsibleGet(id:number): Observable<any>{
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
}

