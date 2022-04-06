const ISDEV = process.env.NODE_ENV !== 'production';

export const HOST = ISDEV ? 'http://localhost:3000' : 'https://import-data.org';

export const POSTPERPAGE = 9;