import { users } from "../data/users.js";
import { createCustomError } from "../middlewares/errors/customError.js";
import * as hashingOps from "../utils/bcrypt.js"
import * as jwtOps from "../utils/jwt.js"

export const register = async (username, password) => {

    // check if the username and password are provided
    if (!username || !password) {
        throw createCustomError("Please provide username and password", 400);
    }

    // check if the username already exists
    const userExists = users.find(user => user.username === username);

    // if the username already exists, throw an error
    if (userExists) {
        throw createCustomError("Username already exists", 409, userExists);
    }

    const hashedPassword = await hashingOps.hashPassword(password);

    // create a new user object
    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword
    };

    // push the user object to the users array
    users.push(newUser);

    // return the user object without the password
    return { id: newUser.id, username: newUser.username };
};

export const login = async (username, password) => {

    // check if the username and password are provided
    if (!username || !password) {
        throw createCustomError("Please provide username and password", 400);
    }

    // check if the username exists
    const user = users.find(user => user.username === username);

    // if the username doesn't exist, throw an error
    if (!user) {
        throw createCustomError("Invalid username or password", 401);
    }

    // check if the password is correct
    const isPasswordCorrect = await hashingOps.comparePassword(password, user.password);

    // if the password is incorrect, throw an error
    if (!isPasswordCorrect) {
        throw createCustomError("Invalid username or password", 401);
    }

    // generate a token
    const token = jwtOps.generateToken(user);

    // console.log(token);

    // the object shouldn't have contained password in this object for security purpose.
    return token;
};