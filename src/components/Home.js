import React from "react";
import Addnote from "./Addnote";
import Notes from "./Notes";

const Home = (props) => {
  return (
    <div>
      <Addnote showAlert={props.showAlert} />
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
