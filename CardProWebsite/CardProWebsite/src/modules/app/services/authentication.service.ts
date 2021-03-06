﻿import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { appConfig } from '../../../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post(appConfig.authenticateUrl, { Username: username, Password: password })
            .map((response: Response) => {
                console.log(response);
                let user = response.json();
                if (user && user.BearerToken) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    oAuthLogin(url: string, accessToken: string) {
        return this.http.post(url, { AccessToken: accessToken })
            .map((response: Response) => {
                console.log(response);
                let user = response.json();
                if (user && user.BearerToken) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        return this.http.get(appConfig.logoutUrl).map((response: Response) => response);
    }
}