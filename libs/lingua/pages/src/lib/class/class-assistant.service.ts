import { IClass, Id, IUpdateClassAssistant } from "@lingua/api";
import { environment } from "@lingua/util-env";
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Types } from "mongoose";

@Injectable({
    providedIn: 'root'
})
export class ClassAssistantService {
    constructor(private http: HttpClient, private auth:AuthService) {}

    addAssistant(assistant: Id, classId: string): Observable<IClass> {
        const data: IUpdateClassAssistant = { assistant: assistant, class: classId  };

        return this.http
            .post<IClass>(`${environment.dataApiUrl}/assistant/add`, data , this.auth.getHttpOptions());
    }

    removeAssistant(assistant: Id, classId: string): Observable<IClass>  {
        const data: IUpdateClassAssistant = { assistant: assistant, class: classId  };

        return this.http
            .post<IClass>(`${environment.dataApiUrl}/assistant/remove`, data, this.auth.getHttpOptions());
    }
}