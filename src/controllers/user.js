import * as userService from '../services/user.js';

export const getUsers = async (req, res, next) => {
    try {
        // Call the getUsers function from the user service
        const users = await userService.getUsers();

        // Send the users as a response
        res.status(200).json({
            message: "Users fetched successfully",
            body: users,
            status: 200
        });
    } catch (error) {

        // Pass the error to the error handling middleware
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        // Extract the id from the request parameters
        const { id } = req.params;

        // Call the getUserById function from the user service
        const user = await userService.getUserById(id);

        // Send the user as a response
        res.status(200).json({
            message: `User with id ${id} fetched successfully`,
            body: user,
            status: 200
        });

    } catch (error) {

        // Pass the error to the error handling middleware
        next(error);
    }
}