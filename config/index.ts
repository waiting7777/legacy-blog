const ISDEV = process.env.NODE_ENV !== 'production';

export const HOST = ISDEV ? 'http://localhost:3000' : 'https://waiting7777.org'

export const POSTPERPAGE = 9;