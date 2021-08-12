const { OAuth2Client } = require('google-auth-library');
export const GoogleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
