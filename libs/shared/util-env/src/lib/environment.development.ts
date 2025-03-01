import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
    production: false,
    dataApiUrl: 'http://localhost:3000/api',
    mongoDbUrl: 'mongodb://127.0.0.1:27017/lingua',
    SECRET_KEY: 'Blastoise'
}