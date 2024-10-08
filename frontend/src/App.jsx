import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Note from "./routes/Note";

function App() {
  const [notes, setNotes] = useState([]);
  const [viewNote, setViewNote] = useState(null);

  const fetchNotes = async () => {
    await axios
      .get("http://localhost:5000/home")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, [notes]);

  const allNotes = notes.map((note) => {
    return (
      <div key={note._id} className="note flex justify-between items-center">
        <div className="mb-6">
          <h1>{note.title}</h1>
          <p>{note.content}</p>
        </div>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => view(note._id)}
            className="p-2 rounded-lg bg-green-500"
          >
            View
          </button>
          <button
            onClick={() => edit(note._id)}
            className="p-2 rounded-lg bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={() => del(note._id)}
            className="p-2 rounded-lg bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  async function view(id) {
    try {
      const response = await axios.get(`http://localhost:5000/home/${id}`);
      const data = response.data;
      navigate(`/home/view`, { state: { note: data } });
    } catch (error) {
      console.log(error);
    }
  }

  async function edit(id) {
    try {
      const response = await axios.get(`http://localhost:5000/home/${id}`);
      const data = response.data;
      // Pass the note data as state
      navigate("/home/edit", { state: { note: data } });
    } catch (error) {
      console.log(error);
    }
  }

  async function del(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/home/${id}`);
      if (response) {
        console.log("Note Deleted");
      }
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>All Notes</h1>
      <a href="/new" className="text-blue-500">
        New Note
      </a>
      <div className="notes-container">{allNotes}</div>
    </>
  );
}

export default App;
