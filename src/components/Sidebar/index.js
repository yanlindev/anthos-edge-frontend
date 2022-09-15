import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import sidebarIcon_1 from '../../assets/images/sidebar-1.svg';
import sidebarIcon_2 from '../../assets/images/sidebar-2.svg';
import sidebarIcon_3 from '../../assets/images/sidebar-3.svg';
import './styles.scss';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul>
        <li>
          <NavLink to="/monitoring" className='sidebar__link' activeClassName='is-active'>
            <img src={sidebarIcon_1} />
            <div className='text'>Monitoring</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/control" className='sidebar__link' activeClassName='is-active'>
            <img src={sidebarIcon_2} />
            <div className='text'>Control</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/workload" className='sidebar__link' activeClassName='is-active'>
            <img src={sidebarIcon_3} />
            <div className='text'>Workload</div>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;