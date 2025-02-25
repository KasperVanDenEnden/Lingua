import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICreateLocation, Id, ILocation, IUpdateLocation } from "@lingua/api";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "@lingua/util-env";
import { AuthService } from "./auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    private refreshSubject = new BehaviorSubject<boolean>(false);
    refresh$ = this.refreshSubject.asObservable();

    constructor(private http: HttpClient, private auth:AuthService) {}

    triggerRefresh() {
        this.refreshSubject.next(true)
    }

    getLocations(): Observable<ILocation[]> {
        return this.http
        .get<ILocation[]>(`${environment.dataApiUrl}/location`, this.auth.getHttpOptions());
    }

    getLocationById(id: string): Observable<ILocation> {
        return this.http
        .get<ILocation>(`${environment.dataApiUrl}/location/${id}`, this.auth.getHttpOptions());
    }

    update(data: IUpdateLocation, id: Id) {
        return this.http
        .put<ILocation>(`${environment.dataApiUrl}/location/${id}`, data, this.auth.getHttpOptions());
    }

    create(data: ICreateLocation) {
    return this.http
    .post<ILocation>(`${environment.dataApiUrl}/location`, data, this.auth.getHttpOptions());
    }
}