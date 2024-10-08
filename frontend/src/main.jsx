import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import New from "./routes/New.jsx";
import Note from "./routes/Note.jsx";
import Edit from "./routes/Edit.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<h1>Go to /home</h1>} />
        <Route path="/home" element={<App />} />
        <Route path="/home/view" element={<Note />} />
        <Route path="/new" element={<New />} />
        <Route path="/home/edit" element={<Edit />} />
      </Routes>
    </Router>
  </>
);
