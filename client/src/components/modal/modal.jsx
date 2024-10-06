import React from "react";
import './style.css';


const Modal = ({ title, closeHandle, Element}) => {
      let iconStyle={ position: "absolute", top: "8px", right: "10px", cursor: "pointer", fontSize: "14px" }

    return (
        <React.Fragment>
            <div className="container_modal border border-success">
                <div className="title">{title}</div>
                <i className="bi bi-x-circle-fill" onClick={() => closeHandle(false)} style={iconStyle}></i>
                <Element/>
            </div>
        </React.Fragment>
    )
}

export default Modal;