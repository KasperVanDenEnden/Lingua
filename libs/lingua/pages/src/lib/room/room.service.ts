import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICreateRoom, Id, IRoom, IUpdateRoom } from "@lingua/api";
import { Observable } from "rxjs";
import { environment } from "@lingua/util-env";

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('JWT')}`
    });

    constructor(private http: HttpClient) {}

    getRooms(): Observable<IRoom[]> {
        return this.http
        .get<IRoom[]>(`${environment.dataApiUrl}/room`, {
            headers: this.headers
        });
    }

    getRoomById(id: string): Observable<IRoom> {
        return this.http
        .get<IRoom>(`${environment.dataApiUrl}/room/${id}`, {
            headers: this.headers
        });
    }

    update(data: IUpdateRoom, id: Id) {
        return this.http
        .put<IRoom>(`${environment.dataApiUrl}/room/${id}`, data, {
            headers: this.headers
        });      
    }

    create(data: ICreateRoom) {
    return this.http
    .post<IRoom>(`${environment.dataApiUrl}/room`, data, {
        headers: this.headers
    });
    }
}