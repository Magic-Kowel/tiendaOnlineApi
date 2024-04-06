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
import securityRouer from "./routes/security.routes.js";
import sizeRouer from "./routes/size.routes.js";
import ageGroupsRouer from "./routes/ageGroups.routes.js";
import materialRouer from "./routes/materials.routes.js";
import gendersRouer from "./routes/genders.routes.js";
import productRouer from "./routes/product.routes.js";

try {
    const app = express();

    app.use(cors(
        {
            origin: '*',
  // Confía en la información del proxy
  trustProxy: true
        }
    ));
    app.use(morgan('short'));
    app.use(express.json());
    //apis
    app.use('/api',usersRoutes);
    app.use('/api',categoryRoutes);
    app.use('/api',subCategoryRouter);
    app.use('/api',securityRouer);
    app.use('/api',sizeRouer);
    app.use('/api',ageGroupsRouer);
    app.use('/api',materialRouer);
    app.use('/api',gendersRouer);
    app.use('/api',productRouer);
    app.use((req,res, next) =>{
        res.status(404).json({
            message: 'endpoint not found'
        })
    })
    // const server = http.createServer(app);
    // const httpServer = server.listen(PORT);
    app.listen(PORT);
    console.log(`server on port ${PORT}`)
} catch (error) {
    console.error(error);
}
// const io = new WebSocketServer(httpServer, {
//     cors: {
//         origin: "*"
//     }
// });
// socket(io);