import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./database/index.js";

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 8000

connectDB()
.then(() => {
    app.get('/', (req, res) => {
        res.send("server is running")
    });
    
    app.listen(port, (res, req) => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
})
.catch((err) => {
    console.log("MongoDb connection err", err);
})
