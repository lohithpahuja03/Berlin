import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'berlin_super_secret_jwt_key_2026',
  JWT_EXPIRES_IN: '7d',

  // Business Rules
  COD_MIN_AMOUNT: 699,
  COD_MAX_AMOUNT: 4999,
  CANCELLATION_WINDOW_SECONDS: 300, // 5 minutes strictly

  DEFAULT_DELIVERY_FEE: 40,
  FREE_DELIVERY_THRESHOLD: 1000,
  TAX_RATE: 0.05, // 5% GST

  // Restaurant Flagship Location (Central Berlin Kitchen)
  STORE_LOCATION: {
    name: 'Berlin Flagship Diner',
    address: 'Alexanderplatz 7, Mitte, Berlin / Sector 29 Cyber Hub',
    lat: 28.4595,
    lng: 77.0266,
  },
};
