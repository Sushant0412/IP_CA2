import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Edit() {
  const navigate = useNavigate(); // For navigation after submission
  const location = useLocation(); // To access state passed when navigating

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Check if note data was passed in the state
    if (location.state && location.state.note) {
      const { title, content } = location.state.note;
      setTitle(title);
      setContent(content);
    } else {
      console.error("No note data found in location state");
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setContent(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/home/${location.state.note._id}/edit`,
        {
          title,
          content,
        }
      );
      console.log("Note updated successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error updating the note:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="block mb-2">
          Title:
        </label>
        <input
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          type="text"
          name="title"
          value={title}
          id="title"
          onChange={handleChange}
          required
        />
        <label htmlFor="content" className="block mb-2">
          Content:
        </label>
        <textarea
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          name="content"
          value={content}
          id="content"
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded-lg">
          Update Note
        </button>
      </form>
      <button
        className="mt-4 bg-gray-400 text-white p-2 rounded-lg"
        onClick={() => navigate("/home")}
      >
        Back to Notes
      </button>
    </div>
  );
}

export default Edit;
