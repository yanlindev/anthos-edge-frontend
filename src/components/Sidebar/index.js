import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import Sidebar1 from '../svg/Sidebar1';
import Sidebar2 from '../svg/Sidebar2';
import Sidebar3 from '../svg/Sidebar3';
import './styles.scss';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul>
        <li>
          <NavLink to="/monitoring" className='sidebar__link' activeClassName='is-active'>
            <Sidebar1 />
            <div className='text'>Monitoring</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/control" className='sidebar__link' activeClassName='is-active'>
            <Sidebar2 />
            <div className='text'>Control</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/workload" className='sidebar__link' activeClassName='is-active'>
            <Sidebar3 />
            <div className='text'>Workload</div>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;