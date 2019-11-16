import React from 'react';

const Button = (props) => {
    return (

        <div className="toolbar" >
            <button className='btn' style={props.allSelectedButton ? { backgroundColor: '#cecece', color: 'black' } : { backgroundColor: 'white' }} onClick={() => props.onClick(false, true)}>All candidates</button>
            <button className='btn' style={props.allSelectedButton ? { backgroundColor: 'white' } : { backgroundColor: '#cecece', color: 'black' }} onClick={() => props.onClick(true, false)}>My candidates</button>
        </div>
    )
}

export default Button;


