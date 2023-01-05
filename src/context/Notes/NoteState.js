import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  // const s1 = {
  //   name: "Rahul",
  //   class: "TY",
  // };
  // const [state, setState] = useState(s1);

  // const settingState = setTimeout(() => {
  //   setState({
  //     name: "Kumar",
  //     class: "SY",
  //   });
  // }, 2000);

  // deploying the fake data
  const notesInitial = [];
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState(notesInitial);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/note/fetchallnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    // console.log("Adding a note");
    //API call

    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    // console.log(JSON.stringify({ title, description, tag }));
    getAllNotes();
  };

  //Update a Note
  const updateNote = async (id, title, description, tag) => {
    // console.log("updating  a note", { title, description, tag });
    //API call
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log("updated", json);
    // let newNotes = JSON.parse(JSON.stringify(notes));
    // for (let index = 0; index < newNotes.length; index++) {
    //   const element = newNotes[index];
    //   if (element._id === id) {
    //     newNotes[index].title = title;
    //     newNotes[index].description = description;
    //     newNotes[index].tag = tag;
    //     break;
    //   }
    // }
    // setNotes(newNotes);
    getAllNotes();
  };

  //Delet a Note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    // console.log("Deleting a note with id :" + id);
    setNotes(
      notes.filter((notes) => {
        return notes._id !== id;
      })
    );
  };

  return <NoteContext.Provider value={{ notes, setNotes, addNote, updateNote, deleteNote, getAllNotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
