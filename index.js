import Express from "express";
import dotenv from "dotenv";

// import routes
import authRoutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/user.js";

// import error handler middleware
import errorHandler from "./src/middlewares/errors/errorHandler.js";
import notFoundHandler from "./src/middlewares/errors/notFoundHandler.js";

// load environment variables from .env file
dotenv.config();

// instance from express class representing web server
const app = Express();

// middleware to parse incoming requests with JSON payloads
app.use(Express.json());


// middleware to handle requests to /auth
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

try {

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}!`);
    });

} catch (error) {
    console.log("Error: ", error);
}