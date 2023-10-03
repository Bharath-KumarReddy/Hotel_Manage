import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Navbar() {

  function logout() {
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/">
          Shey Rooms
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"><i className='fa fa-bars' style={{color: 'white'}}></i></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">

         


          <ul class="navbar-nav ml-auto">

          {localStorage.getItem('currentUser') ? (
            <div class="dropdown mr-5">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-user" aria-hidden="true"></i>  {JSON.parse(localStorage.getItem('currentUser')).name} 
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link class="dropdown-item" to="/profile">Profile</Link>
              <Link class="dropdown-item" to="" onClick={logout}>Logout</Link>
            </div>
          </div>

          ) : (
            <>
            <li class="nav-item active">
              < Link class="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login">
                Login
              </Link>
            </li>
            </>
            )}
           
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
