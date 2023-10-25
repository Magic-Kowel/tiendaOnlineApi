import { pool } from "./src/db.js";
import logger from "./src/libs/logger.js";
import { getCategory } from "./src/controllers/category/getCategory.controller.js";
export const socket = (io) => {
    io.on("connection",async (socket)  => {
        socket.on("getCategory", async () => {
            try {
                const response = await getCategory();
                socket.emit("itemsGetCategory", response);
            } catch (error) {
                logger.error(error);
            }
        });
    });
};