import express from 'express';
import { Application } from 'express';
import cursoRoutes from './routes/curso.routes';

class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.routes();
        this.middlewares();
    }
    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    private routes(): void {
        this.app.use(cursoRoutes);
    }
}
    
export default new App().app;
