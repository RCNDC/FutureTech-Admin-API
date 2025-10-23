declare namespace NodeJS {
    interface ProjectEnv {
        PORT?: number;
        NODE_ENV?: 'development' | 'production';
        API_KEY_VALUE: string; 
        DATABASE_URL: string;
        SHADOW_DATABASE_URL: string;
        JWT_SECRET: string;
        JWT_EXPIRES_IN: number;
        REFRESH_TOKEN_EXPIRES_IN: string;
    }
}