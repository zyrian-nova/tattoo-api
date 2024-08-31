import { Request, Response, Router } from "express";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        
        router.get('/api/users', (req: Request, res: Response) => {
            return res.status(200).json({ message: 'OK'})
        })

        return router;
    }
}