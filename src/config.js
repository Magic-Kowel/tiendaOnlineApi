import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const SECRET_KEY = 'mysecrettext';

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_DATABASE = process.env.DB_DATABASE || 'tienda'

export const EMAIL_USER = process.env.EMAIL_USER||"a20170094@utem.edu.mx"
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD||"hbtfbfmzprywydkr"