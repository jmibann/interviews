import React, { useState } from 'react';
import { toastr, actions as toastrActions } from 'react-redux-toastr';
import axios from 'axios';

import Dropzone from './Dropzone';
import ProgressBar from './ProgressBar';
import './uploadFile.css';

const MAX_SIZE = 5e6;
const allowedFiletypes = ['pdf', 'doc', 'docx', 'txt'];

const UploadFile = () => {

  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfullyUploaded, setSuccessfullyUploaded] = useState(false);

  const filesAddition = (newFile) => {

    if (checkSizeAndFiletype(newFile)) return;

    let newFileArray = newFile.concat(files);
    setFiles(newFileArray);
  }

  const renderProgress = (file, uploadProgress) => {
    const fileUploadProgress = uploadProgress[file.name];

    // if (isUploading || successfullyUploaded) {
    return (
      <div className="progress-wrapper">
        <span className="filename ">{file.name}</span>
        <ProgressBar progress={fileUploadProgress ? fileUploadProgress.percentage : 0} />
        <img
          alt="done"
          className="check-icon"
          src="/img/check_circle_outline-24px.svg"
          style={{ opacity: fileUploadProgress && fileUploadProgress.state === "done" ? 0.5 : 0.5 }}
        />
      </div>
    );
    // }
  }

  const clear = () => {
    setFiles([]);
    setSuccessfullyUploaded(false);
  }

  const checkFileSize = (file) => { if (file.size >= MAX_SIZE) return true }

  const checkFileType = (fileName) => {
    let isError = false;
    let fileType = fileName.split(".").reverse().shift().toLowerCase();

    if (allowedFiletypes.indexOf(fileType) < 0) isError = true;

    return isError
  }

  const checkSizeAndFiletype = (fileList) => {
    let isError = false;

    fileList.forEach(file => {
      if (checkFileSize(file)) {
        isError = true;
        toastr.error('Maximum file size exceeded', 'Check each file do not exceed 5Mb')
      }
      if (checkFileType(file.name)) {
        isError = true;
        toastr.error(`${file.name}`, 'Filetype not allowed. Check each file are: .PDF/.DOC/.DOCX/.TXT type')
      }
    });
    return isError;
  }

  const renderActions = () => {
    if (successfullyUploaded) {
      return (<button className='btn btn-orange' onClick={clear}> Clear </button>);
    } else {
      return (<button className='btn btn-orange' disabled={files.length <= 0 || isUploading} onClick={uploadFiles}> Upload </button>);
    }
  }

  const uploadFiles = () => {
    setUploadProgress({});
    setIsUploading(true);

    const promises = [];

    files.forEach(file => promises.push(sendRequest(file)));

    Promise.all(promises).then(() => setSuccessfullyUploaded(true)).then(() => setIsUploading(false));

  }

  const sendRequest = (file) => {
    console.log("IMPLEMENT FUNCTION TO SEND FILES TO API")
    console.log(" ----------------------> QUE CARANCHO LLEGA?: ", file);

    let formData = new FormData();
    formData.append('file', file);

    console.log("*************************** FORMDATA: ", formData.values())

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    // axios.post("/api/file/piphole", formData,config)

    // return new Promise((resolve, reject) => {
    //   const req = new XMLHttpRequest();
    //   req.upload.addEventListener("progress", event => {
    //    if (event.lengthComputable) {
    //     const copy = { ...this.state.uploadProgress };
    //     copy[file.name] = {
    //      state: "pending",
    //      percentage: (event.loaded / event.total) * 100
    //     };
    //     this.setState({ uploadProgress: copy });
    //    }
    //   });

    //   req.upload.addEventListener("load", event => {
    //    const copy = { ...this.state.uploadProgress };
    //    copy[file.name] = { state: "done", percentage: 100 };
    //    this.setState({ uploadProgress: copy });
    //    resolve(req.response);
    //   });

    //   req.upload.addEventListener("error", event => {
    //    const copy = { ...this.state.uploadProgress };
    //    copy[file.name] = { state: "error", percentage: 0 };
    //    this.setState({ uploadProgress: copy });
    //    reject(req.response);
    //   });

    //   const formData = new FormData();
    //   formData.append("file", file, file.name);

    //   req.open("POST", "http://localhost:8000/upload");
    //   req.send(formData);
    //  });
  }

  return (
    <div className="upload">
      <div className="content">
        <div>
          <Dropzone filesAddition={filesAddition} disabled={isUploading || successfullyUploaded} />
        </div>
        <div className="files">
          {files.map(file => {
            return (
              <div key={file.name} className='row atachment'>
                {renderProgress(file, uploadProgress)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="actions" />
      {renderActions()}
    </div>
  )
}

export default UploadFile;