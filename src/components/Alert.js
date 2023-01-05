import React from "react";

const Alert = (props) => {
  if (props.alert !== null) {
    const capitalization = (word) => {
      if (word === "danger") {
        word = "error";
      }
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    };
    return (
      <div>
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show role="alert"`}>
          <strong>{capitalization(props.alert.type)}: </strong> {props.alert.message}
        </div>
      </div>
    );
  }
};

export default Alert;
