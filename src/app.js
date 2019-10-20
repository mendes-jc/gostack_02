import express from 'express';
import routes from './routes';

import './database'; // Nao precisa de nome pois não precisamos do retorno

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
