import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: 'http://localhost:4200/home',
    scope: 'openid profile'
  });

  constructor( public router: Router, private http: HttpClient ) {}

  public login(): void {
    console.log('login called');
    this.auth0.authorize();
    this.handleAuthentication()
  }

  public handleAuthentication(): void {
    console.log('Handleing auth');
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('Autherntication called', authResult);    
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);   
        
      this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        console.log('profile info', profile);
      }
      else{
        console.log('Error!',err);
      }
    });
        

      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });

  }

  private setSession(authResult): void {
    console.log('setting session');
    
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

  }

  public logout(): void {
    console.log('Logging out!!');
    
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    console.log('is Authenticated called');
    
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }


  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }
    const self = this;
   
  }

}