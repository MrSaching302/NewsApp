// import React from 'react'
// import { Link } from 'react-router-dom'

// const NavBar = () => {
//     return (
//         <div>
//             <nav className="navbar fixed-top navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
//                 <div className="container-fluid">
//                     <Link className="navbar-brand" to="/">NewsApp</Link>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <Link className="nav-link" aria-current="page" to="/">Home</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/business">Business</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/entertainment">Entertainment</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/general">General</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/health">Health</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/science">Science</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/sports">Sports</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/technology">Technology</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     )
// }
// export default NavBar
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          NewsApp
        </Link>
        <button
          className={`navbar-toggler ${isNavbarOpen ? '' : 'collapsed'}`}
          type="button"
          onClick={handleNavbarToggle}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/business" onClick={closeNavbar}>
                Business
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/entertainment" onClick={closeNavbar}>
                Entertainment
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/general" onClick={closeNavbar}>
                General
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/health" onClick={closeNavbar}>
                Health
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/science" onClick={closeNavbar}>
                Science
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sports" onClick={closeNavbar}>
                Sports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/technology" onClick={closeNavbar}>
                Technology
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
