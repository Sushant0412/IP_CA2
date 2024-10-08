import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

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
      await axios.post("http://localhost:5000/home/new", {
        title,
        content,
      });
      console.log("Note Created");
      setContent("");
      setTitle("");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

function goBack(){
  navigate("/home")
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-xl font-bold mb-4 text-gray-700 text-center">
          Create New Note
        </h1>
        <label htmlFor="title" className="block text-gray-600 mb-2">
          Title:
        </label>
        <input
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Title"
          type="text"
          name="title"
          value={title}
          id="title"
          onChange={handleChange}
        />
        <label htmlFor="content" className="block text-gray-600 mb-2">
          Content:
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Content"
          type="text"
          value={content}
          name="content"
          id="content"
          onChange={handleChange}
        />
        <div className="flex gap-3">
          <button
          onClick={goBack}
            className="bg-blue-500 w-full text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-green-500 w-full text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default New;
