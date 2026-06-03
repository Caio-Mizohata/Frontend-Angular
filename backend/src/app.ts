import express from 'express';
import { Application } from 'express';
import cursoRoutes from './routes/curso.routes';
import { corsMiddleware } from './middlewares/cors.middleware';

class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    private middlewares(): void {
        this.app.use(corsMiddleware);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    private routes(): void {
        this.app.use(cursoRoutes);
    }
}

export default new App().app;
