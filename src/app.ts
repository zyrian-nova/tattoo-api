import { envs } from "./config/envs";
import { Server } from "./server";

// Self-Invoking Function, is invoked (started) automatically, without being called.
(() => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
    })

    server.start();
}