declare namespace NodeJS {
    interface ProjectEnv {
        PORT?: number;
        NODE_ENV?: 'development' | 'production';
        API_KEY_VALUE: string; 
    }
}