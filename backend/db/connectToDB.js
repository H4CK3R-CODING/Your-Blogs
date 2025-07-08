import mongoose from "mongoose";

// MongoDB Connection
const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};

export default connectToDB;
