import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginDto } from '../models/Dtos/User/LoginDto';
import { RegisterDto } from '../models/Dtos/User/RegisterDto';
import { TokenDto } from '../shared/models/dtos/TokenDto';
import { UserToken as DecodedUserToken } from '../models/UserToken';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = new Subject<boolean>();

  constructor(protected http: HttpClient) {}

  public get authStatus(): Observable<boolean> {
    return this._authStatus.asObservable();
  }

  public set updatedAuthStatus(newValue: boolean) {
    this._authStatus.next(newValue);
  }

  public get isAuthenticated(): boolean {
    return this.token !== null;
  }

  public get token(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }

  public get user(): DecodedUserToken | null {
    console.log(jwtDecode(this.token!));
    if (!this.isAuthenticated) {
      return null;
    } else {
      return jwtDecode(this.token!);
    }
  }

  init() {
    if (this.isAuthenticated) {
      this.updatedAuthStatus = true;
    }
  }

  login(request: LoginDto): Observable<TokenDto> {
    const url = `${environment.apiBaseUrl}${environment.loginEndpoint}`;
    return this.http.post<TokenDto>(url, request).pipe(
      tap((tokenDto) => {
        localStorage.setItem(environment.tokenKey, tokenDto.token);
        this.updatedAuthStatus = true;
      })
    );
  }

  logout() {
    localStorage.removeItem(environment.tokenKey);
    this.updatedAuthStatus = false;
  }

  register(registrationRequest: RegisterDto): Observable<HttpResponse<any>> {
    const url = `${environment.apiBaseUrl}${environment.registerEndpoint}`;
    return this.http.post<any>(url, registrationRequest, {
      observe: 'response',
    });
  }

  isUserNameAvailable(username: string): Observable<boolean> {
    const url = `${environment.apiBaseUrl}${environment.checkUsernameEndpoint}${username}`;
    return this.http.get<boolean>(url);
  }

  isEmailAvailable(email: string): Observable<boolean> {
    const url = `${environment.apiBaseUrl}${environment.checkEmailEndpoint}${email}`;
    return this.http.get<boolean>(url);
  }
}
