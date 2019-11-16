import React from 'react';

export const Checkbox = props => {
  return (
    <div>
      < li>
        <input key={props.id} className='questions' onChange={props.handleCheckChildElement} type="checkbox" checked={props.isChecked} value={props.id} />
        <label>{props.content}</label>
      </li >

    </div>
  )
}

export default Checkbox;