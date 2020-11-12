import mongoose from 'mongoose';
import gradeModel  from "./gradeModel.js";
import dotenv from "dotenv";

dotenv.config({
    path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
})

const db = {};
db.mongoose = mongoose;
db.user = process.env.DB_USER;
db.password = process.env.DB_PASS
db.url = process.env.DB_HOST
db.grade = gradeModel(mongoose);


console.log(db.user);
console.log(db.password);
console.log(db.url);

export { db };
