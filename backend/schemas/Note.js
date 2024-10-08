import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 30 },
  content: { type: String, required: true },
  //author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
