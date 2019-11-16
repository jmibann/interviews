import React, { useState } from 'react';
import './dropzone.css'

const Dropzone = ({ disabled, filesAddition }) => {

  const [fileInputRef, setFileInputRef] = useState(React.createRef());
  const [hightlight, setHightLight] = useState(false);

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  }

  const fileListToArray = (list) => {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  const onFilesAdded = (e) => {
    if (disabled) return;

    if (filesAddition) {
      let files = e.target.files;
      let array = fileListToArray(files);
      filesAddition(array);
    }
  }

  const onDragOver = (evt) => {
    evt.preventDefault();

    if (disabled) return;
    setHightLight(true);
  }

  const onDragLeave = () => { setHightLight(false) }

  const onDrop = (event) => {

    event.preventDefault();
    if (disabled) return;

    const files = event.dataTransfer.files;

    if (onFilesAdded) {
      let array = fileListToArray(files);
      filesAddition(array);
    }
    setHightLight(false);
  }

  return (
    <div>

      <button onClick={openFileDialog} className="btn btn-orange no-margin">
        <span>Upload Files </span>
        <span className="fas fa-paperclip"></span>
        <input ref={fileInputRef} className="file-input" type="file" multiple onChange={onFilesAdded} />
      </button>
      <div className={`dropzone ${hightlight ? "highlight" : ""}`} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onClick={openFileDialog} style={{ cursor: disabled ? "default" : "pointer" }}>
        {/* <img alt="upload" className="icon" src='/img/cloud_upload-24px.svg' /> */}

        {/* <i className="fas fa-paperclip icon"></i> */}

      </div>
    </div>
  );
}

export default Dropzone;