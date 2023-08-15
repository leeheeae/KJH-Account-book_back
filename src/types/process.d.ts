/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    SWAGGER_USER: string;
    SWAGGER_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    JWT_PRIVATE_KEY: string;
    JWT_EXPIRES_SEC: string;
    REFRESH_EXPIRES_SEC: string;
  }
}
