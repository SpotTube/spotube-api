export default () => ({
  APP_PORT: parseInt(process.env.APP_PORT, 10) || 8000,
  IS_DEV: process.env.NODE_ENV !== 'production',
  DATABASE: {
    HOST: process.env.MONGO_HOST,
    PORT: parseInt(process.env.MONGO_PORT, 10) || 27017,
    USER: process.env.MONGO_USER,
    PASSWORD: process.env.MONGO_PASS,
    NAME: process.env.MONGO_DATABASE,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRED: process.env.JWT_EXPIRED,
  MINIO: {
    END_POINT: process.env.MINIO_END_POINT,
    PORT: process.env.MINIO_PORT,
    ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
    SECRET_KEY: process.env.MINIO_SECRET_KEY,
    REGION: process.env.MINIO_REGION,
    SSL: process.env.MINIO_SSL,
  },
});
