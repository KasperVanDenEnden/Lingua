import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICreateRoom, Id, IRoom, IUpdateRoom } from "@lingua/api";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "@lingua/util-env";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private refreshSubject = new BehaviorSubject<boolean>(false);
    refresh$ = this.refreshSubject.asObservable();

    constructor(private http: HttpClient, private auth:AuthService) {}

    triggerRefresh() {
        this.refreshSubject.next(true)
    }

    getRooms(): Observable<IRoom[]> {
        return this.http
            .get<IRoom[]>(`${environment.dataApiUrl}/room`, this.auth.getHttpOptions());
    }

    getRoomById(id: string): Observable<IRoom> {
        return this.http
            .get<IRoom>(`${environment.dataApiUrl}/room/${id}`, this.auth.getHttpOptions());
    }

    update(data: IUpdateRoom, id: Id) {
        return this.http
            .put<IRoom>(`${environment.dataApiUrl}/room/${id}`, data, this.auth.getHttpOptions());
    }

    create(data: ICreateRoom) {
        return this.http
            .post<IRoom>(`${environment.dataApiUrl}/room`, data, this.auth.getHttpOptions());
    }
}