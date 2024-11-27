import { createCustomError } from "../middlewares/errors/customError.js";
import { users } from "../data/users.js";

export const getAllUsers = async () => {
    return users;
};

export const getUserById = async (userId) => {
    const user = users.find((user) => user.id === parseInt(userId));
    if (!user) {
        throw createCustomError("User not found!", 404, null);
    }
    return user;
};
