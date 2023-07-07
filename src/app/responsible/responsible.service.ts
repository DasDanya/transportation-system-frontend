import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Responsible } from "./responsible";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
    providedIn: 'root'
})
export class ResponsibleService{

    
    private apiServerUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) {}

    public getResponsibles(): Observable<Responsible[]>{
        return this.http.get<Responsible[]>(`${this.apiServerUrl}/responsible/all`);
    }

    
    public addResponsible(responsible: FormData): Observable<any>{
        return this.http.post<any>(`${this.apiServerUrl}/responsible/add`, responsible);
    }

    
}

