import mongoose from "mongoose";

export const ConntectDb = () => {
    const DB = process.env.DATABASE;
    // console.log("DB",DB)
  mongoose
    .connect(DB,{dbName:"Amazon"})
    .then(() => {
      console.log("Database is Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
