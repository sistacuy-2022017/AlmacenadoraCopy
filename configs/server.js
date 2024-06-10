'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/user/user.routes.js'
import authPath from '../src/auth/auth.routes.js'
import toDoRoutes from '../src/to-do/to-do.routes.js'

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.userPath = '/almacenadora/v1/users'
        this.authPath = '/almacenadora/v1/auth'
        this.toDoPath = '/almacenadora/v1/to-do'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.userPath, userRoutes)
        this.app.use(this.authPath, authPath);
        this.app.use(this.toDoPath, toDoRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

export default Server;