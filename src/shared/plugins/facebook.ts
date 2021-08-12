import { Facebook } from 'fb';
export const FBApp = new Facebook({
  appId: process.env.FB_APP_ID,
  appSecret: process.env.FB_APP_SECRET,
  // version: '11.0',
  Promise: require('bluebird'),
});
