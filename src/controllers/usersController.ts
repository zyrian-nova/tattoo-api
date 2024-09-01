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
                
        // Validation: EMAIL is not empty
        if (!email) return res.status(400).json({ error: `Bad request: email is required` });
        
        // Validation: EMAIL has the correct format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;
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

    public createUser = async (req: Request, res: Response) => {
        const { name, email, password, avatar, role_id } = req.body;

        // Validation: NAME
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: `Invalid name` });
        }

        // Validation: EMAIL has the correct format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: `Invalid email format` });
        }

        // Validation: PASSWORD it's not empty and it's a string
        if (!password || typeof password !== 'string') {
            return res.status(400).json({ error: `Invalid password` });
        }
        // HASHING the PASSWORD (npm install bcrypt)
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Validation: AVATAR must be one of the following formats
        const avatarRegex = /\.(jpg|jpeg|png|webp)$/i;
        if (!avatar || !avatarRegex.test(avatar)) {
            return res.status(400).json({ error: `Invalid avatar format. Must be .jpg, .jpeg, .png, or .webp` });
        }
        // Validation: AVATAR file size must be limited

        // Validation: user must have a ROLE ID
        if (!role_id || !Number.isInteger(role_id)) {
            return res.status(400).json({ error: `Invalid role_id` });
        }
        // Validate: ROLE ID must be validated with existing roles

        try {
            const answer = await this.pool.query('INSERT INTO users (name, email, password, avatar, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, password, avatar, role_id]);

            return res.status(201).json({ message: `User was created: ${answer.rows[0]}`});
        } catch (error) {
            console.log('User could not be created', error);
            return res.status(500).json({ error: `Error creating user: ${error}`})
        }

    }
}