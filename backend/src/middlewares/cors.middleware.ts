import { Request, Response, NextFunction } from 'express';
import { CorsOptions } from 'cors';
import cors from 'cors';

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
  };
    cors(corsOptions)(req, res, (err: Error | null) => {
        if (err) {
            return next(err);
        }
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
            return res.status(200).end();
        }
        next();
    });
}