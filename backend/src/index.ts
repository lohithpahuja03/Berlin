import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { CONFIG } from './config/index.js';
import apiRouter from './routes/api.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    service: 'Berlin Fast-Food Platform Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    businessRules: {
      codEligibleRange: `₹${CONFIG.COD_MIN_AMOUNT} - ₹${CONFIG.COD_MAX_AMOUNT}`,
      cancellationWindowSeconds: CONFIG.CANCELLATION_WINDOW_SECONDS,
      defaultTheme: 'DARK',
    },
  });
});

// Mount API router
app.use('/api', apiRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'API route not found' });
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Start server
app.listen(CONFIG.PORT, () => {
  console.log(`🍔 BERLIN backend server running at http://localhost:${CONFIG.PORT}`);
  console.log(`🚀 Health check: http://localhost:${CONFIG.PORT}/api/health`);
  console.log(`📦 Catalog: http://localhost:${CONFIG.PORT}/api/products`);
});

export default app;
