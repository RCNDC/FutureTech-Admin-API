import 'dotenv/config';
import express from 'express';

import logger from './util/logger';

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
