import { useLocation, useNavigate } from "react-router-dom";

function Note() {
  const location = useLocation();
  const { note } = location.state || {};
  const navigate = useNavigate();
  function goBack() {
    navigate("/home");
  }

  if (!note) {
    return <div className="text-center text-red-500">No note found</div>;
  }

  return (
    <div className="mt-5 max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
      <p className="text-lg leading-7 text-gray-700">{note.content}</p>
      <button
        onClick={goBack}
        className="bg-blue-500 w-full text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Back
      </button>
    </div>
  );
}

export default Note;
