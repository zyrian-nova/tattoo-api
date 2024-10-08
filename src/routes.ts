import { Router } from "express";
import { UsersController } from "./controllers/usersController";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        const usersController = new UsersController();

        router.get('/api/users', usersController.getUsers);
        router.get('/api/user/email/:email', usersController.getUsersByEmail);
        router.get('/api/user/:id', usersController.getUsersById);
        router.put('/api/user/:id', usersController.updateUser);
        router.delete('/api/user/:id', usersController.deleteUser);
        router.post('/api/user/create', usersController.createUser);

        return router;
    }
}