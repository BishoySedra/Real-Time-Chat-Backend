import { createCustomError } from "../middlewares/errors/customError.js";
import { users } from "../data/users.js";

export const getUsers = async () => {
    return users;
};

export const getUserById = async (id) => {
    // users.forEach((user) => console.log(user.id));

    const foundUser = users.find(user => user.id === id);

    if (!foundUser) {
        throw createCustomError(`User not found with the id ${id}!`, 404)
    }

    return foundUser;
};
