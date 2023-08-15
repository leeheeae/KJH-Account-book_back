/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    DATABASE_URL: string;
    PRIVATE_KEY: string;
    PORT: string;
    BACKEND_URL: string;
    FRONTEND_URL: string;
    PRIVATE_KEY: string;
    SALT_ROUNDS: string;
    SWAGGER_MODE: string;
    JWT_PRIVATE_KEY: string;
    JWT_EXPIRES_SEC: string;
    REFRESH_EXPIRES_SEC: string;
  }
}
