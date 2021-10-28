import mongoose from 'mongoose';
import config from "../../config";

function connect(){
    const dbUrl = config.dbUrl as string;

    return mongoose
        .connect(dbUrl)
        .then(() => console.log("Database connected."))
        .catch((err) => {
            console.log("Database error: " + err.message);
            process.exit(1);
        });
}

export default connect;