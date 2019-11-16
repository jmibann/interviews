import React from 'react';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.onSubmit} className='main-login'>
      <img className='logo' src='./img/logo.png' />
      <div className='form-group'>
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input id="exampleInputEmail1" className="form-control" type="email" onChange={props.onChange} className="inputLogin form-control" aria-describedby="emailHelp" name="email" placeholder="Enter email" required />
      </div>
      <div className='form-group'>
        <label className='loginLabel' htmlFor="exampleInputPassword1">Password</label>
        <input id="exampleInputPassword1" className="form-control" type="password" className="inputLogin form-control" onChange={props.onChange} name="password" placeholder="Password" required />
      </div>
      <button type="submit" className="btn login-btn">
        <span>Login <i className="fas fa-sign-in-alt"></i></span>
      </button>
    </form>
  );
};

export default LoginForm;