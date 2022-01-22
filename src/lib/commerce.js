import Commerce from '@chec/commerce.js'

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, process.env.REACT_APP_COMMERCE_LOG);