import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/Notes/noteContext";
import Noteitem from "./Noteitem";

const Notes = (props) => {
  const navigation = useNavigate();
  const { showAlert } = props;
  const context = useContext(NoteContext);
  const { notes, getAllNotes, updateNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigation("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ eid: "", etitle: "", edescription: "", etag: "" });

  const update = (currentNote) => {
    ref.current.click();
    // console.log(currentNote);
    setNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] });
  };

  const handelOnCLick = (e) => {
    // console.log("updating note", note);
    // console.log(Array.isArray(note.edescription));
    updateNote(
      note.eid,
      Array.isArray(note.etitle) ? note.etitle[0] : note.etitle,
      Array.isArray(note.edescription) ? note.edescription[0] : note.edescription,
      Array.isArray(note.etag) ? note.etag[0] : note.etag
    );
    showAlert("Edited successfully", "success");
    refClose.current.click();
  };
  return (
    <div>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="container">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleOnChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleOnChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleOnChange} />
                  </div>
                  {/* 
                  <button type="submit" className="btn btn-primary" onClick={handleOnClick}>
                    Add Note
                  </button> */}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handelOnCLick}
                disabled={(Array.isArray(note.etitle) ? note.etitle[0].length : note.etitle) < 5 || (Array.isArray(note.edescription) ? note.edescription[0].length : note.edescription) < 5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h3 className="text-center">Your Notes</h3>
          <div className="container">{notes.length === 0 && "No notes are yet...."}</div>
          {notes.map((notes) => {
            return <Noteitem showAlert={showAlert} notes={notes} key={notes._id} update={update} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
