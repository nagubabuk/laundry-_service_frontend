import React from "react";
import './Summarypopup.css'
 
const Summarypopup = props => {
  return (
    <div>
      <div className="summary-box">
        <span className="summary-close-icon" onClick={props.handleClose}>X</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Summarypopup;