import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './util/logger';
import authRoutes from './routes/auth/route';
import userRoutes from './routes/user/route';
import attendeeRoutes from './routes/attendees/route';
import ticketRoutes from './routes/ticket/route';
import submissionRoute from './routes/submission/route';
import followRoute from './routes/followup/route';
import followupNoteRoute from './routes/followupnote/route';
import mailRoute from './routes/mail/route';
import uploadRouter from './routes/uploads/route';
import partnerRoute from './routes/partner/route';
import roleRoutes from './routes/role/route';
import menuRoute from './routes/menu/route';
import permissionRoutes from './routes/permission/route';
import companyRoute from './routes/company/route';
import salesDashboardRoutes from './routes/salesdashboard/route';

const app = express();


const port = process.env.PORT || 3000;

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection', {
    reason: reason instanceof Error ? reason.message : String(reason),
    stack: reason instanceof Error ? reason.stack : undefined,
  });
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', {
    message: err.message,
    stack: err.stack,
  });
});

// app.use(limiter);
const normalizeOrigin = (origin: string): string => origin.trim().replace(/\/+$/, '').toLowerCase();
const allowedHeaders = ['Content-Type', 'x-api-key', 'Authorization'];
const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];

const whitelist = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);

const isOriginAllowed = (requestOrigin?: string): boolean => {
  if (!requestOrigin || whitelist.length === 0) {
    return true;
  }

  return whitelist.includes(normalizeOrigin(requestOrigin));
};

const corsOptions: cors.CorsOptions = {
  origin(requestOrigin, callback) {
    callback(null, isOriginAllowed(requestOrigin));
  },
  allowedHeaders,
  credentials: true,
  methods: allowedMethods,
  optionsSuccessStatus: 204,
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  if (req.method !== 'OPTIONS') {
    next();
    return;
  }

  const requestOrigin = req.header('Origin');
  if (requestOrigin && isOriginAllowed(requestOrigin)) {
    if (!res.getHeader('Access-Control-Allow-Origin')) {
      res.header('Access-Control-Allow-Origin', requestOrigin);
    }
    if (!res.getHeader('Access-Control-Allow-Credentials')) {
      res.header('Access-Control-Allow-Credentials', 'true');
    }
    if (!res.getHeader('Vary')) {
      res.header('Vary', 'Origin');
    }
  }

  if (!res.getHeader('Access-Control-Allow-Methods')) {
    res.header('Access-Control-Allow-Methods', allowedMethods.join(','));
  }

  if (!res.getHeader('Access-Control-Allow-Headers')) {
    const requestHeaders = req.header('Access-Control-Request-Headers');
    res.header('Access-Control-Allow-Headers', requestHeaders || allowedHeaders.join(','));
  }

  res.sendStatus(204);
});
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/attendee', attendeeRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/register', submissionRoute);
app.use('/api/submission', followRoute);
app.use('/api/progress', followupNoteRoute);
app.use('/api/mail', mailRoute);
app.use('/api/partner', partnerRoute);
app.use('/api/menu', menuRoute);
app.use('/api/upload', uploadRouter);
app.use('/api/role', roleRoutes);
app.use('/api/permission', permissionRoutes);
app.use('/api/company', companyRoute);
app.use('/api/sales-dashboard', salesDashboardRoutes);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const safeBody =
    req.path === '/api/auth/login'
      ? { email: req.body?.email }
      : req.body;

  logger.error('Unhandled Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: safeBody
  });
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

