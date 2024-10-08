import mongoose from "mongoose";
import Note from "./Note.js";

export const connectDB = async () => {
  mongoose
    .connect("mongodb://localhost:27017/IP_CA_2")
    .then(() => {
      console.log("Successfully connected to DB");
    })
    .catch((e) => {
      console.log(e);
    });
};

const seedDB = async () => {
  try {
    connectDB();
    await Note.deleteMany({});
    for (let i = 0; i < 10; i++) {
      const newNote = new Note({
        title: "A Book",
        content: "Hello, how are you ?",
      });
      await newNote.save();
    }
    mongoose.connection.close();
    console.log("Database seeded");
  } catch (error) {
    console.log(error);
  }
};

//seedDB();
