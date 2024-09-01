import { Request, Response } from "express";
import { Pool } from "pg";
import { envs } from "../config/envs";

export class UsersController {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: envs.DB_HOST,
        })
    }

    // Return all users CAREFUL!
    public getUsers = async (req: Request, res: Response) => {
        try {
            const answer = await this.pool.query('SELECT * FROM users');
            const users = answer.rows;

            return res.status(200).json(users);
            console.log(answer);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: `Error obtaining users: ${error}`})
        }
    }

    // Return ONE user by ID
    public getUsersById = async (req: Request, res: Response) => {
        const id = req.params.id;

        // Validation: ID is not empty
        if (!id) return res.status(400).json({ error: `Bad request: id is required` });
        // Validation: ID is a number
        if (isNaN(Number(id))) {
            return res.status(400).json({ error: `Bad request: id must be a number` });
        }

        try {
            const answer = await this.pool.query('SELECT * FROM users WHERE id = $1', [id]);
            const user = answer.rows[0];

            // Validation: ID value is more than 0
            if (answer.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json(answer.rows[0]);
        } catch (error) {
            console.log('Error fetching user:', error);
            return res.status(500).json({ error: `Error retrieving user: ${error}` });
        }
    } 

    // Return ONE user by EMAIL
    public getUsersByEmail = async (req: Request, res: Response) => {
        const email = req.params.email;
        // EMAIL formatting (regular expression)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;

        // Validation: EMAIL is not empty
        if (!email) return res.status(400).json({ error: `Bad request: email is required` });

        // Validation: EMAIL has the correct format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: `Invalid email format` });
        }

        // Validation: EMAIL doesn't exceed VALUE (254 by RFC 5321) characters
        if (email.length > 254) {
            return res.status(400).json({ error: `Email is too long` });
        }

        try {
            const answer = await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = answer.rows[0];

            // Validation: ID value is more than 0
            if (answer.rows.length === 0) {
                return res.status(404).json({ error: `User not found` });
            }

            return res.status(200).json(answer.rows[0])
        } catch (error) {
            console.log('Error fetching user:', error);
            return res.status(500).json({ error: `Error retrieving user: ${error}` });
        }


    }
}