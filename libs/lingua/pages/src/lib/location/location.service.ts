import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICreateLocation, Id, ILocation, IUpdateLocation } from "@lingua/api";
import { Observable } from "rxjs";
import { environment } from "@lingua/util-env";
import { Types } from "mongoose";


@Injectable({
    providedIn: 'root'
})
export class LocationService {
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('JWT')}`
    });

    constructor(private http: HttpClient) {}

    getLocations(): Observable<ILocation[]> {
        return this.http
        .get<ILocation[]>(`${environment.dataApiUrl}/location`, {
            headers: this.headers
        });
    }

    getLocationById(id: string): Observable<ILocation> {
        return this.http
        .get<ILocation>(`${environment.dataApiUrl}/location/${id}`, {
            headers: this.headers
        });
    }

    update(data: IUpdateLocation, id: Id) {
        return this.http
        .put<ILocation>(`${environment.dataApiUrl}/location/${id}`, data, {
            headers: this.headers
        });      
    }

    create(data: ICreateLocation) {
    return this.http
    .post<ILocation>(`${environment.dataApiUrl}/location`, data, {
        headers: this.headers
    });
    }
}