import sqlite3 from "sqlite3";

import { log } from "../utils/logger.js";



const db = new sqlite3.Database("./database.sqlite", (err) => {

    if (err) {

        console.error("Database connection failed:", err);

    } else {

        log("Connected to the database.");

    }

});



export default db;