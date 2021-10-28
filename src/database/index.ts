import mongoose from 'mongoose';
import config from "../../config";

function connect(){
    const dbUrl = config.dbUrl as string;

    return mongoose
        .connect(dbUrl)
        .then(() => {
            console.log("Database connected.");
        })
        .catch((error) => {
            console.error("Database error: " + error);
            process.exit(1);
        });
}

export default connect;