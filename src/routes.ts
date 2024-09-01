import { Router } from "express";
import { UsersController } from "./controllers/usersController";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        const usersController = new UsersController();

        router.get('/api/users', usersController.getUsers);
        router.get('/api/users/id/:id', usersController.getUsersById);
        router.get('/api/users/email/:email', usersController.getUsersByEmail);

        return router;
    }
}