import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const register = async (req: any, res: any) => {
    try {
        const {
            email,
            password,
            name,
        } = req.body;

        const data = {
            email,
            password,
            name,
            photoUrl: "https://eu.ui-avatars.com/api/?name=" + name.replace(/\s/g, '+') + "&size=250"
        };

        const createdUser = await prisma.user.create({
            data: data,
        });

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

const login = async (req: any, res: any) => {
    try {
        const {
            email,
            password,
        } = req.body;
        
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

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