import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import logger from './util/logger';
import authRoutes from './routes/Auth/route';
import userRoutes from './routes/User/route';

const app = express();

const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.NODE_ENV == 'production'? process.env.FRONTEND_URL: 'http://localhost:5173',
  allowedHeaders: [
    'Content-Type',
    'x-api-key'
  ],
  credentials: true,
  methods:['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(cookieParser())
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
