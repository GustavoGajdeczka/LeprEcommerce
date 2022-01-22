import Commerce from '@chec/commerce.js'
// Dev
//export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);
// Build
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);