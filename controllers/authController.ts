import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const registerUser = async (req: any, res: any) => {
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

module.exports = {
  registerUser,
};