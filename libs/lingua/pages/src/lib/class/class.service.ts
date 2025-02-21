import { ICreateClass, Id, IClass, IUpdateClass } from "@lingua/api";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "@lingua/util-env";
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    private refreshSubject = new BehaviorSubject<boolean>(false);
    refresh$ = this.refreshSubject.asObservable();

    constructor(private http: HttpClient, private auth:AuthService) {}

    triggerRefresh() {
        this.refreshSubject.next(true)
    }

    getClasses(): Observable<IClass[]> {
        return this.http
            .get<IClass[]>(`${environment.dataApiUrl}/class`, this.auth.getHttpOptions());
    }

    getClassById(id: string): Observable<IClass> {
        return this.http
            .get<IClass>(`${environment.dataApiUrl}/class/${id}`, this.auth.getHttpOptions());
    }

    update(data: IUpdateClass, id: Id) {
        return this.http
            .put<IClass>(`${environment.dataApiUrl}/class/${id}`, data, this.auth.getHttpOptions());
    }

    create(data: ICreateClass) {
        return this.http
            .post<IClass>(`${environment.dataApiUrl}/class`, data, this.auth.getHttpOptions());
    }
}