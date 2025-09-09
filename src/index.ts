import 'dotenv/config';
import express from 'express';

import logger from './util/logger';
import authRoutes from './routes/Auth/route';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
