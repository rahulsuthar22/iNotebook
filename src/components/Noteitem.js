import React, { useContext } from "react";
import NoteContext from "../context/Notes/noteContext";

const Noteitem = (props) => {
  const { showAlert } = props;
  const { title, description, tag, date } = props.notes;
  const { update } = props;
  let shortDate = new Date(date).toLocaleString();
  //   console.log(shortDate);
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const handelDelete = (id) => {
    deleteNote(id);
    showAlert("Note deleted successfully", "success");
  };
  return (
    <div className="my-2 col-md-3">
      <div>
        <div className="card ">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title ">{title}</h5>
              <div>
                <i
                  className="fa-solid fa-trash mx-1"
                  onClick={() => {
                    handelDelete(props.notes._id);
                  }}
                ></i>
                <i
                  className="fa-solid fa-pen-to-square mx-1"
                  onClick={() => {
                    update(props.notes);
                  }}
                ></i>
              </div>
            </div>
            <p className="card-subtitle mb-2 text-muted">Tag: {tag} </p>
            <p className="card-subtitle mb-2 text-muted">Date: {shortDate}</p>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
