import { Request, Response } from 'express';
import { insertUser, getUserByEmail } from '../infrastructure/repository/prisma/user/repository';

const register = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password,
            name,
        } = req.body;

        const user = await getUserByEmail(email);
        
        if (user) {
            return res.status(409).json({
                code: 409,
                success: false,
                message: 'User already exist!',
                content: null
            });
        }

        const data = {
            email: email,
            password,
            name,
            photoUrl: "https://eu.ui-avatars.com/api/?name=" + name.replace(/\s/g, '+') + "&size=250"
        };

        const createdUser = await insertUser(data);

        return res.status(200).json({
            code: 200,
            success: true,
            message: 'Successfully register user!',
            content: createdUser
        });

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password,
        } = req.body;
        
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: 'User not found!',
                content: null
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                code: 401,
                success: false,
                message: 'Wrong password!',
                content: null
            });
        }

        return res.status(200).json({
            code: 200,
            success: true,
            message: 'Successfully login user!',
            content: user
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export {
    register,
    login,
};