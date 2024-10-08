import { Router } from "express";
const route = Router();
import {
  getNote,
  getAllNote,
  addNote,
  editNote,
  deleteNote,
} from "../controllers/GetNote.js";

route.get("/", getAllNote);
route.post("/new", addNote);
route.get("/:id", getNote);
route.put("/:id/edit", editNote);
route.delete("/:id", deleteNote);

export default route;
