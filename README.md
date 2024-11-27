# Real-Time Chat Application Backend

This repository contains the backend for a simple real-time chat application. The backend is built using **Node.js** and **Express.js**, with **Socket.IO** for real-time communication. The project includes user authentication, chat room management, real-time messaging, and comprehensive API documentation using **Postman**.

---

## Table of Contents

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Installation and Setup](#installation-and-setup)  
4. [API Endpoints](#api-endpoints)  
5. [Authentication](#authentication)  
6. [Real-Time Communication](#real-time-communication)  
7. [Postman Documentation](#postman-documentation)  

---

## Features

- **User Management**:  
  - User registration and login with secure JWT-based authentication.  
- **Chat Room Management**:  
  - Create, join, leave, and list chat rooms.  
- **Real-Time Messaging**:  
  - Broadcast messages and notify users in real-time using Socket.IO.  
- **Secure Endpoints**:  
  - JWT-protected endpoints for secure operations.  
- **Message History**:  
  - Fetch chat room message history via REST API.  

---

## Technologies Used

- **Node.js**: JavaScript runtime for backend development.  
- **Express.js**: Web framework for building RESTful APIs.  
- **Socket.IO**: Real-time bidirectional communication.  
- **JWT (jsonwebtoken)**: Secure token-based authentication.  
- **Postman**: API documentation and testing.  

---

## Installation and Setup

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/BishoySedra/Real-Time-Chat-Backend.git
   cd Real-Time-Chat-Backend
   ```

2. **Install Dependencies**:  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:  
   Rename a `.env.example` file with `.env` in the root directory, add and fill the following credentials:  
   ```env
   PORT= (OPTIONAL)
   SALT_ROUNDS=
   JWT_SECRET=
   ```

4. **Run the Application**:  
   ```bash
   npm start
   ```

5. **Access the Application**:  
   The server will be running at `http://localhost:3000`.

---

## API Endpoints

### **Authentication**

- **POST /auth/register**  
  Register a new user with `username` and `password`.

- **POST /auth/login**  
  Log in with `username` and `password` to receive a JWT token.

### **Chat Rooms**

- **POST /rooms**  
  Create a new chat room (JWT required).

- **GET /rooms**  
  Fetch a list of all available chat rooms (JWT required).

- **POST /rooms/:roomId/join**  
  Join a specific chat room by `roomId` (JWT required).

- **POST /rooms/:roomId/leave**  
  Leave a specific chat room by `roomId` (JWT required).

- **GET /rooms/:roomId/messages**  
  Fetch the message history of a specific chat room (JWT required).

---

## Authentication

JWT tokens are required to access all endpoints except `/register` and `/login`. Include the token in the `Authorization` header as follows:  
```
Authorization: Bearer <your-token>
```

---

## Real-Time Communication

**Socket.IO** is used for real-time features:  

- Users in the same chat room can send and receive messages in real-time.  
- Notifications for users joining or leaving a chat room.  

### Events:

- **connect**: Establish a connection to the server.
- **join-room**: Join a specific chat room.  
- **disconnect**: Leave a specific chat room.  
- **send-message**: Broadcast a new message to the chat room.  

---

## Postman Documentation

Comprehensive API documentation is available via **Postman**. It includes:  

- Request details (headers, parameters, body).  
- Example responses for both success and error cases.  

You can import the documentation using the provided `Postman_Collection.json` file in this repository.