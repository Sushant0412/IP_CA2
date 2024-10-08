import Note from "../schemas/Note.js";

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    res.json(note);
  } catch (error) {
    console.log(error);
  }
};

export const addNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Incomplete Info" });
    }

    const note = new Note({ title, content });
    await note.save();

    return res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editNote = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from URL parameters
    const { title, content } = req.body; // Get title and content from request body

    if (!title || !content) {
      return res.status(400).json({ error: "Incomplete Info" });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // Return the updated note
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllNote = async (req, res) => {
  try {
    const allNotes = await Note.find({});
    res.json(allNotes);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
};
