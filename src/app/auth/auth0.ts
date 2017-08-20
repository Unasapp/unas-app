interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'dQBbTjHyKT_VcOLxZ2tNCYTy7Gd5Pkyx',
  domain: 'penguinhousedesigns.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};