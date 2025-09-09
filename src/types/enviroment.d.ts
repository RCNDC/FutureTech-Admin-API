declare namespace NodeJS {
    interface ProjectEnv {
        PORT?: number;
        NODE_ENV?: 'development' | 'production';
        API_KEY_VALUE: string; 
        DATABASE_URL: string;
        SHADOW_DATABASE_URL: string;
    }
}