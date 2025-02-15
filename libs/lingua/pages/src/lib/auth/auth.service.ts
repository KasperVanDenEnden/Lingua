import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, Subscription, switchMap, tap } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "@lingua/util-env";
import { ICreateUser, IUser } from "@lingua/api";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService implements OnDestroy {
    public currentUser$ = new BehaviorSubject<IUser | undefined>(undefined);
    private readonly CURRENT_USER = 'currentuser';
    private readonly TOKEN_KEY = 'JWT';
    userSubscription:Subscription | undefined;
    localStorageSubscription: Subscription | undefined;

    private readonly headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute) {
      // Get current user out of the local storage
      this.localStorageSubscription = this.getUserFromLocalStorage()
        .pipe(
          switchMap((user: IUser | undefined) => {
            if (user) {
              this.currentUser$.next(user);
              return of(user);
            } else {
              return of(undefined);
            }
          })
        )
        .subscribe();
    }
  
    // Login user and store in local storage
    login(email: string, password: string): Observable<boolean> {
      const data = { email: email, password: password };
  
      return this.http
        .post<IUser>(`${environment.dataApiUrl}/auth/login`, data, {
          headers: this.headers,
        })
        .pipe(
          switchMap((response: any) => {
            // Set JWT token
            localStorage.setItem('JWT', response.access_token);
  
            // Fetch user from the API
            return this.getUser(email);
          }),
          tap((user: IUser) => {
            // Set the current user in local storage and set currentUser$
            localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
            this.currentUser$.next(user);
          }),
          map(() => true),
          catchError((err: any) => {
            console.error('Login error:', err);
            return of(false);
          })
        );
    }
  
    register(userData: ICreateUser): Observable<IUser | undefined> {
      return this.http
        .post<IUser>(`${environment.dataApiUrl}/user`, userData, {
          headers: this.headers,
        })
        .pipe(
          map((user) => {
            return user;
          }),
          catchError((err: any) => {
            return of(undefined);
          })
        );
    }
  
    getUser(email: string): Observable<IUser> {
      return this.http.get(environment.dataApiUrl + `/auth/profile`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.getToken(),
        }),
      }) as Observable<IUser>;
    }
  
    getToken(): string {
      return localStorage.getItem(this.TOKEN_KEY)!;
    }
  
    // Modify this method based on your authentication logic
    isAuthenticated(): boolean {
      // Example: Check if user is logged in or has a valid token
      return localStorage.getItem(this.TOKEN_KEY) !== null;
    }
  
    // Validate JWT token
    validateToken(userData: IUser): Observable<IUser | undefined> {
      const url = `${environment.dataApiUrl}/auth/profile`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userData?.token,
        }),
      };
      return this.http.get<any>(url, httpOptions).pipe(
        map((response) => {
          return response;
        }),
        catchError(() => {
          this.logout();
          this.currentUser$.next(undefined);
          return of(undefined);
        })
      );
    }
  
    // Log user out / delete from local storage
    logout(): void {
      localStorage.clear();
      this.currentUser$.next(undefined);
    }
  
    // Get user from local storage
    getUserFromLocalStorage(): Observable<IUser> {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
      return of(localUser);
    }
  
    // Get user from local storage
    getUserDataFromLocalStorage(): Observable<{ results: IUser } | null> {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
      return of(localUser);
    }
  
    // Save user in the local storage
    saveUserToLocalStorage(user: IUser): void {
      localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
    }
  
    // Get the HTTP options for a request
    getHttpOptions(): object {
      let token;
      this.getUserFromLocalStorage()
        .subscribe((user) => {
          if (user) {
            token = user.token;
          }
        })
        .unsubscribe();
  
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }),
      };
    }
  
    ngOnDestroy(): void {
      this.localStorageSubscription?.unsubscribe();
      this.userSubscription?.unsubscribe();
    }
}