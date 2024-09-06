import { envs } from "./config/envs";
import { AppRoutes } from "./routes";
import { Server } from "./server";

// Self-Invoking Function, is invoked (started) automatically, without being called.
(() => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        host: envs.HOST,
        routes: AppRoutes.routes,
    })

    server.start();
}