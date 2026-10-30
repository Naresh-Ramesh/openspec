import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const createApp = () => {
  const app = express();

  // Standard middleware
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }));
  app.use(express.json());
  app.use(cookieParser());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
};

export const app = createApp();

