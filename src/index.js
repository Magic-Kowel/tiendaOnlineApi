import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import { Server as WebSocketServer } from "socket.io";
// import http from "http";
import { PORT } from './config.js';
// import { socket } from './../socket.js';
// routes

import usersRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subCategoryRouter from "./routes/subCategory.routes.js";
const app = express();
 
app.use(cors());
app.use(morgan('short'));
app.use(express.json());
//apis
app.use('/api',usersRoutes);
app.use('/api',categoryRoutes);
app.use('/api',subCategoryRouter);
app.use((req,res, next) =>{
    res.status(404).json({
        message: 'endpoint not found'
    })
})
// const server = http.createServer(app);
// const httpServer = server.listen(PORT);
app.listen(PORT);
console.log(`server on port ${PORT}`);
 
// const io = new WebSocketServer(httpServer, {
//     cors: {
//         origin: "*"
//     }
// });
// socket(io);