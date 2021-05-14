import express, { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import routes from './routes';
import { ValidationError } from 'express-validation';

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);
});

createConnection()
  .then((_) => console.log('☁ [database]: Database connection established'))
  .catch((error) =>
    console.error(`⚠ [database]: Couldn't connect to the database: ${error}`)
  );
