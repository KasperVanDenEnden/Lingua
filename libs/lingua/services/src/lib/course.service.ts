import { Id, ICourse, IUpdateCourse, ICreateCourse } from "@lingua/api";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "@lingua/util-env";
import { AuthService } from "./auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private refreshSubject = new BehaviorSubject<boolean>(false);
    refresh$ = this.refreshSubject.asObservable();

    constructor(private http: HttpClient, private auth:AuthService) {}

    triggerRefresh() {
        this.refreshSubject.next(true)
    }

    getCourses(): Observable<ICourse[]> {
        return this.http
            .get<ICourse[]>(`${environment.dataApiUrl}/course`, this.auth.getHttpOptions());
    }

    getCourseById(id: string): Observable<ICourse> {
        return this.http
            .get<ICourse>(`${environment.dataApiUrl}/course/${id}`, this.auth.getHttpOptions());
    }

    update(data: IUpdateCourse, id: Id) {
        return this.http
            .put<ICourse>(`${environment.dataApiUrl}/course/${id}`, data, this.auth.getHttpOptions());
    }

    create(data: ICreateCourse) {
        return this.http
            .post<ICourse>(`${environment.dataApiUrl}/course`, data, this.auth.getHttpOptions());
    }

    delete(id: Id) {
        return this.http
            .delete<ICourse>(`${environment.dataApiUrl}/course/${id}`, this.auth.getHttpOptions());
    }
}