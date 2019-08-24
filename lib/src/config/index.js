export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  staticAssetsPath: process.env.STATIC_ASSETS_PATH,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtLifetime: process.env.JWT_LIFETIME
}