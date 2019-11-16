import React from 'react';

const Button = (props) => {
    return (
        <div className='form-group is-flex-end'>
            <button className="btn btn-orange pull-right no-margin" type={props.type} onClick={props.onClick}>
                <span>{props.text}</span>
                <span className={props.icon}></span>
            </button>
        </div>
    )
}

export default Button;