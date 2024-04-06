import { config } from "dotenv";
config();
console.log(process.env.DB_HOST);
export const PORT = process.env.PORT || 3000;
export const SECRET_KEY = 'mysecrettext';

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_DATABASE = process.env.DB_DATABASE || 'tienda';

export const EMAIL_USER = process.env.EMAIL_USER||"a20170094@utem.edu.mx";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD||"hbtfbfmzprywydkr";
export const PORT_EMAIL = process.env.PORT_EMAIL || 587;
export const HOST_EMAIL = process.env.HOST_EMAIL || 'smtp.gmail.com';

export const STATUS_USER_PROCESS = process.env.STATUS_USER_PROCESS || "01ae3cd3-144c-46a3-99aa-bb9174761b37";
export const STATUS_USER_ACTIVE = process.env.STATUS_USER_ACTIVE || "2660376e-dbf8-44c1-b69f-b2554e3e5d4c";
export const STATUS_USER_CANCEL = process.env.STATUS_USER_CANCEL || "5bf018a2-07c0-497e-b376-94531e337dad";
export const STATUS_USER_FINISHED = process.env.STATUS_USER_FINISHED || "93a484c5-ce42-435e-98ac-12bc215d95b5";
export const STATUS_USER_DELETE = process.env.STATUS_USER_DELETE || "fa6cc9a2-f221-4e27-b575-1fac2698d27a";

export const TYPE_USER_ADDMIN = process.env.TYPE_USER_ADDMIN || 1;
export const TYPE_USER_CLIENT = process.env.TYPE_USER_CLIENT || 2;
export const BASE_URL_FRONT = "http://localhost:5173";