import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logOut } from '../../../redux/action-creator/user';
import { connect } from 'react-redux';

const Header = (props) => {
  return (

    props.user && props.user.id
      ? <div className='header'>
        <div className='pull-left'>
          <Link to='/candidate'> <img className='imgLogoHeader' src='/img/logo.png' /></Link>
        </div>
        <div className='main-nav'>
          <ul>
            <li><NavLink className='headerLinkStyle' to="/candidate">Candidates <i className="fas fa-user-tie"></i></NavLink></li>
            <li>{props.user.isAdmin && <NavLink className='headerLinkStyle' to="/users">Users <i className="fas fa-user-friends"></i></NavLink>}</li>
            <li>{props.user.isAdmin && <NavLink className='headerLinkStyle' to="/configuration">Configuration <i className="fas fa-wrench"></i></NavLink>}</li>
          </ul>
        </div>

        <div style={{ float: 'left', lineHeight: '56px', paddingLeft: '200px' }} >VER 1.2.13</div>

        <div className="log-out">
          <li className="dropdown">
            <span className="username">{props.user.nombre}</span>
            <span href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <span className="userimage"><i className="fas fa-user-circle"></i></span>
            </span>
            <ul className="dropdown-menu">
              <li>
                <a href="" className="logout" onClick={(e) => {
                  e.preventDefault();
                  props.logOut().then(() => props.history.push('/login'))
                }}><i className="fas fa-power-off"></i> Logout</a>
              </li>
            </ul>
          </li>
        </div>
      </div>
      : null
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});
const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch((logOut()))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);