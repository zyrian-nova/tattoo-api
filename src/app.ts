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
        routes: AppRoutes.routes,
    })

    server.start();
}