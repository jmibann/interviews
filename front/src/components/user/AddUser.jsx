import React from 'react';

const AddUser = (props) => {
  return (
    <div>

      <div style={{ width: '60%', margin: 'auto' }}>

        <form onSubmit={props.onSubmit} className='formUser'>
          <div className='addUserDiv'>
            <label htmlFor="nombre" style={{ margin: '8px 5px 8px 0' }}>Full Name</label>
            <input onChange={props.onChange} type="text" className="inputLogin form-control" id="nombre" aria-describedby="emailHelp" name="nombre" />
          </div>

          <div className='addUserDiv'>
            <label htmlFor="email" style={{ margin: '8px 5px 8px 0' }}>Email</label>
            <input onChange={props.onChange} type="email" className="inputLogin form-control" id="email" name="email" aria-describedby="emailHelp" />
            <small id="emailHelp" className="form-text text-muted tiny">Remember you can only add @endava.com emails </small>
          </div>

          <div className='addUserDiv'>
            <label htmlFor="password" style={{ margin: '8px 5px 8px 0' }}>Password</label>
            <input onChange={props.onChange} type="password" className="inputLogin form-control" name="password" id="password" />
          </div>

          <div className='addUserDiv'>
            <label htmlFor="password" style={{ margin: '8px 5px 8px 0' }}>Confirm your password</label>
            <input onChange={props.onChange} type="password" className="inputLogin form-control" name="secondPassword" id="confPassword" />
          </div>

          <div className='addUserDiv' style={{ height: '45px' }}>

            <div className='addUserDiv' style={{ height: '45px', marginBottom: '20px', marginTop: '20px', float: 'right' }}>
              <div style={{ display: 'inline', margin: '20px 20px 8px 0' }}> Is admin?</div>
              <input type="checkbox" id='checkboxIsAdm' value={true} onChange={props.onChange} className=" radioScale" id="isAdmin" name="isAdmin" />
            </div>
          </div>

          <div>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onSubmit={props.onSubmit} type="submit" className="btn btn-orange pull-right" >Create user</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;