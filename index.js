import { app, server } from './src/socket/index.js';
import Express from "express";
import dotenv from "dotenv";

// import routes
import authRoutes from "./src/routes/auth.js";
import roomRoutes from "./src/routes/room.js";

// import error handler middlewares
import errorHandler from "./src/middlewares/errors/errorHandler.js";
import notFoundHandler from "./src/middlewares/errors/notFoundHandler.js";

// load environment variables from .env file
dotenv.config();

// middleware to parse incoming requests with JSON payloads
app.use(Express.json());

// middleware to handle requests
app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);

// middleware to handle errors
app.use(errorHandler);
app.use(notFoundHandler);

try {

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Server is running on port ${port}!`);
    });

} catch (error) {
    console.log("Error: ", error);
}
