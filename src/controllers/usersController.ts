import { Request, Response } from "express"

export class UsersController {
    constructor() {
    }
    public getUsers = (req: Request, res: Response) => {
        return res.status(200).json({ message: 'OK'})
    }
}