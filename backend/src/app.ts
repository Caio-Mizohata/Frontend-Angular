import express from 'express';
import { Application } from 'express';
import cursoRoutes from './routes/curso.routes';

class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    private middlewares(): void {
        // CORS simples para permitir requests do Angular em localhost
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
                return res.status(200).end();
            }
            next();
        });

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    private routes(): void {
        this.app.use(cursoRoutes);
    }
}

export default new App().app;
