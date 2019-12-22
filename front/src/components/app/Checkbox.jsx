import React from 'react';

export const Checkbox = ({ id, handleCheck, isChecked, content }) => {
  return (
    <div>
      < li>
        <input key={id} className='questions' onChange={() => handleCheck(id, isChecked)} type="checkbox" checked={isChecked} value={id} />
        <label>{content}</label>
      </li >

    </div>
  )
}

export default Checkbox;