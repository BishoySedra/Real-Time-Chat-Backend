import * as authServices from "../services/auth.js";

export const register = async (req, res, next) => {

    try {
        // get username and password from request body
        const { username, password } = req.body;

        // call register function from authServices
        const user = await authServices.register(username, password);

        // send response to client
        res.status(200).json({
            message: "User registered successfully!",
            body: user,
            status: 200
        });
    } catch (error) {
        next(error);
    }

};

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const token = await authServices.login(username, password);

        res.status(200).json({
            message: "User logged in successfully!",
            body: {
                "access-token": token
            },
            status: 200
        });

    } catch (error) {
        next(error);
    }
};