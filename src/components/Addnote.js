import React, { useContext, useState } from "react";
import NoteContext from "../context/Notes/noteContext";

const Addnote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const { showAlert } = props;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleOnClick = (e) => {
    // console.log("On click is clicked");
    e.preventDefault();
    addNote(note.title[0], note.description[0], note.tag[0]);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note Added Successfuly", "success");
  };

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] });
  };
  return (
    <div>
      <form>
        <div className="container">
          <h2>Add Note</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleOnChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleOnChange} />
          </div>

          <button
            disabled={(Array.isArray(note.title) ? note.title[0].length : note.title) < 5 || (Array.isArray(note.description) ? note.description[0].length : note.description) < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleOnClick}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addnote;
