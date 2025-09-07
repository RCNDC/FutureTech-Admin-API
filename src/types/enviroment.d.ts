declare namespace NodeJS{
    interface ProjectEnv{
        PORT?: number;
        NODE_ENV?: 'development' | 'production';
    }
}