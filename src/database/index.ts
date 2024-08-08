import mongoose from "mongoose";

const connectToDb: (url: string) => Promise<typeof mongoose> = (
  url: string
) => {
  return mongoose
    .connect(url,{dbName:'rentalsdb1'})
    .then((connected) =>{
        console.log("Connected to database")
        return connected
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export default connectToDb;
