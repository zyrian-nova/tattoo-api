import express from 'express';

interface Options {
    port: number;
}

export class Server {
    private app = express();
    private readonly port: number;

    constructor(options: Options) {
        const { port } = options;

        this.port = port;
    }

    async start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`)
        })
    }
}