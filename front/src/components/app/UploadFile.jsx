import React, { useState } from 'react';
import { toastr, actions as toastrActions } from 'react-redux-toastr';

import Dropzone from './Dropzone';
import './uploadFile.css';

const MAX_SIZE = 5e6;
const MAX_CHARACTERS = 9;
const allowedFiletypes = ['pdf', 'doc', 'docx', 'txt'];

const UploadFile = ({ onChange, uploadFiles, isUploading, files, setFiles}) => {

  const [uploadProgress, setUploadProgress] = useState({});
  const [successfullyUploaded, setSuccessfullyUploaded] = useState(false);

  const filesAddition = (newFile) => {

    if (checkSizeAndFiletype(newFile)) return;

    let newFileArray = newFile.concat(files);
    newFileArray = removeDuplications(newFileArray);
    setFiles(newFileArray);
  }

  const removeDuplications = (fileArray) => {
    return fileArray.filter((item, index, arr) => index === arr.findIndex((t) => (t.name === item.name)));
  }

  const characterLimiter = (string) => {

    if (string.length >= MAX_CHARACTERS) {
      return string.slice(0, MAX_CHARACTERS) + '...'
    } else {
      return string
    }
  }

  const renderProgress = (file, uploadProgress) => {
    const fileUploadProgress = uploadProgress[file.name];
    
    return (
      <div className='progress-wrapper'>
        <span className='filename '>{characterLimiter(file.name)}</span>
      </div>
    );

  }

  const clear = () => {
    setFiles([]);
    setSuccessfullyUploaded(false);
  }

  const checkFileSize = (file) => { if (file.size >= MAX_SIZE) return true }

  const checkFileType = (fileName) => {
    let isError = false;
    let fileType = fileName.split('.').reverse().shift().toLowerCase();

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
        toastr.error('Filetype not allowed', 'Check filetype: .PDF/.DOC/.DOCX/.TXT')
      }
    });
    return isError;
  }

  const renderActions = () => {
    if (successfullyUploaded) {
      return (<button className='btn btn-orange pull-right no-margin' onClick={clear}> Clear </button>);
    } else {
      return (<button className='btn btn-orange pull-right no-margin' disabled={files.length <= 0 || isUploading} onClick={uploadFiles}> Upload </button>);
    }
  }



  return (
    <div className='upload'>
      <div className='content'>
        <div className='left-content'>
          <label className='pull-left' >Work Experience: </label>
          <textarea onChange={onChange} className='inputLogin add-candidate-text-input' rows='3' name='expertise'></textarea>
        </div>

        <Dropzone
          files={files}
          onChange={onChange}
          renderActions={renderActions}
          filesAddition={filesAddition}
          renderProgress={renderProgress}
          uploadProgress={uploadProgress}
          disabled={isUploading || successfullyUploaded}
        />

      </div>
    </div>
  )
}


export default UploadFile;