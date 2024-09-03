import { Router } from "express";
import { UsersController } from "./controllers/usersController";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        const usersController = new UsersController();

        router.get('/api/users', usersController.getUsers);
        router.get('/api/user/search/:id', usersController.getUsersById);
        router.get('/api/user/email/:email', usersController.getUsersByEmail);
        router.post('/api/user/create', usersController.createUser);
        router.put('/api/user/edit/:id', usersController.updateUser);
        router.delete('/api/user/delete/:id', usersController.deleteUser);

        return router;
    }
}