import React, { useState } from 'react';
import './dropzone.css'

const Dropzone = ({ files, disabled, filesAddition, renderActions, renderProgress, uploadProgress }) => {

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
    <div className='right-content'>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={openFileDialog}
        onDragLeave={onDragLeave}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
        className={`dropzone ${hightlight ? 'highlight' : ''}`}
      >

        <input ref={fileInputRef} className='file-input' type='file' multiple onChange={onFilesAdded} />

        <div className='files'>
          {
            files.length > 0 ?
              files.map(file =>
                <div key={file.name} className='row atachment'>
                  {renderProgress(file, uploadProgress)}
                </div>
              )
              : <label> Drop files here or click to upload </label>
          }
        </div>
      </div>

    </div>
  );
}

export default Dropzone;