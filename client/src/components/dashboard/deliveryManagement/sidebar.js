import React from 'react';

function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <a href="https://localhost:3000/dashboardHome" className="nav-link collapsed">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li> 
      {/* <!-- End Dashboard Nav --> */}

      <li className="nav-item">
        <a className="nav-link " data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-menu-button-wide"></i><span>Delivery Management</span><i className="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a href="https://localhost:3000/deliverymanager">
              <i className="bi bi-circle"></i><span>Packaged</span>
            </a>
          </li>
          <li>
            <a href="https://localhost:3000/delivering">
              <i className="bi bi-circle"></i><span>Delivering</span>
            </a>
          </li>

          <li>
            <a href="https://localhost:3000/Completed">
              <i className="bi bi-circle"></i><span>Completed</span>
            </a>
          </li>
          
        </ul>
      </li>
      {/* <!-- End Components Nav --> */}



    </ul>

  </aside>
    );
}

export default Sidebar;