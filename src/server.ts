import express, { Router } from 'express';

interface Options {
    port: number;
    host: string;
    routes: Router;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly host: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, host } = options;

        this.port = port;
        this.host = host;
        this.routes = routes;
    }

    async start() {
        this.app.use(express.json())

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`)
        })
    }
}