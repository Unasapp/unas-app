module.exports = {
  secret: 'keyboardcat',// Your secret here
  // connectstring: 'postgres://oebdqhdh:1A2Y_mAX5ZiIk4_tFUANeyZbthl2xEZ_@stampy.db.elephantsql.com:5432/oebdqhdh',
  connectstring: "postgres://uunjpeyj:yVNsIpBpaTMB_a2TXEss-Gmq1DGSIOte@pellefant.db.elephantsql.com:5432/uunjpeyj" ,
  auth0: {
    domain: 'penguinhousedesigns.auth0.com',// App Auth0 domain,
    clientID: 'dQBbTjHyKT_VcOLxZ2tNCYTy7Gd5Pkyx',// Client ID,
    clientSecret: '80vsT2jKM3sJo7JPtYf6j2V3aEwh2DGOqSdmELY1xy2mnHUmfWun1f_cA80ahEzz', //Client Secret,
    callbackURL: 'http://localhost:4200/auth/callback'
  }
};
