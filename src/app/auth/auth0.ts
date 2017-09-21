interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'P5M7o1Hv2Os2xWbByNeVrFX8cuoWhHVw',
  domain: 'penguinhousedesigns.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};