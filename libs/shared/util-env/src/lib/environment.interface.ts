export interface IEnvironment {
    SECRET_KEY: string;
    production: boolean;
    dataApiUrl: string;
    mongoDbUrl: string;
}